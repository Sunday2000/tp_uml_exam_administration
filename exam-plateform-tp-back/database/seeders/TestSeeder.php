<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\CandidateSubject;
use App\Models\SpecialitySubject;
use App\Models\TestCenter;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class TestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->update([
             "password" => Hash::make("password")
        ]);
        User::query()->whereHas('students')
        ->get()
        ->each(function(User $user){
            $user->assignRole('Etudiant');
        });

        // --- Transcript test data ---
        $candidate = Candidate::first();

        if (! $candidate) {
            $this->command->warn('No candidate found. Run DatabaseSeeder first.');
            return;
        }

        // Assign a test center
        $testCenter = TestCenter::first();
        if ($testCenter) {
            $candidate->update(['test_center_id' => $testCenter->id]);
        }

        // Set deliberation
        $candidate->update([
            'deliberation' => 'Admis',
            'deliberation_date' => now(),
        ]);

        // Get speciality subjects for this candidate's speciality
        $specialitySubjects = SpecialitySubject::where('speciality_id', $candidate->speciality_id)
            ->with('subject')
            ->get();

        if ($specialitySubjects->isEmpty()) {
            $this->command->warn('No speciality subjects found for candidate speciality.');
            return;
        }

        // Create CandidateSubject rows with realistic grades
        $grades = [14.00, 12.00, 15.50, 11.00, 13.00];

        foreach ($specialitySubjects as $index => $ss) {
            CandidateSubject::updateOrCreate(
                [
                    'candidate_id' => $candidate->id,
                    'speciality_subject_id' => $ss->id,
                ],
                [
                    'exam_grade' => $grades[$index % count($grades)],
                    'absent' => false,
                    'speciality_subject' => [
                        'id' => $ss->id,
                        'speciality_id' => $ss->speciality_id,
                        'subject_id' => $ss->subject_id,
                        'coefficient' => $ss->coefficient,
                        'subject' => $ss->subject?->toArray(),
                    ],
                ],
            );
        }

        $this->generateTranscriptPreview($candidate->id);
        $this->generateConvocationPreview($candidate->id);

        $this->command->info("Transcript & convocation test data ready. Use candidate_id = {$candidate->id}");
    }

    private function generateTranscriptPreview(int $candidateId): void
    {
        $candidate = Candidate::with([
            'student.user',
            'student.examSchool.school',
            'student.examSchool.exam',
            'speciality.grade',
            'speciality.serie',
            'testCenter',
            'candidateSubjects.specialitySubjectRelation.subject',
        ])->find($candidateId);

        if (! $candidate) {
            $this->command->warn('Cannot generate transcript preview: candidate not found.');
            return;
        }

        $user = $candidate->student?->user;
        $exam = $candidate->student?->examSchool?->exam;
        $school = $candidate->student?->examSchool?->school;
        $speciality = $candidate->speciality;
        $testCenter = $candidate->testCenter;

        if (! $user || ! $exam || ! $speciality) {
            $this->command->warn('Cannot generate transcript preview: missing candidate relations (user/exam/speciality).');
            return;
        }

        $totalCoefficient = 0;
        $totalWeightedPoints = 0;
        $grades = [];

        $subjects = $candidate->candidateSubjects->map(function ($cs) use (&$totalCoefficient, &$totalWeightedPoints, &$grades) {
            $relation = $cs->specialitySubjectRelation;
            $coefficient = (float) ($relation?->coefficient ?? 0);
            $grade = (float) ($cs->exam_grade ?? 0);
            $absent = (bool) $cs->absent;
            $weightedPoints = $absent ? 0 : $grade * $coefficient;

            if (! $absent) {
                $totalCoefficient += $coefficient;
                $totalWeightedPoints += $weightedPoints;
                $grades[] = $grade;
            }

            return [
                'label' => $relation?->subject?->label ?? '-',
                'type' => $relation?->subject?->type ?? '-',
                'coefficient' => $coefficient,
                'grade' => $grade,
                'absent' => $absent,
                'weighted_points' => $weightedPoints,
            ];
        });

        $computedAverage = $totalCoefficient > 0
            ? round($totalWeightedPoints / $totalCoefficient, 2)
            : 0;

        $mention = Candidate::mentionFromAverage($computedAverage);
        $highestGrade = count($grades) > 0 ? max($grades) : 0;
        $lowestGrade = count($grades) > 0 ? min($grades) : 0;

        // Generate QR code containing exam title + candidate matricule
        $qrData = ($exam->title ?? 'Examen') . ' | ' . ($candidate->matricule ?? $candidate->id);
        $qrOptions = new \chillerlan\QRCode\QROptions;
        $qrOptions->outputInterface = \chillerlan\QRCode\Output\QRGdImagePNG::class;
        $qrOptions->scale = 5;
        $qrOptions->outputBase64 = true;
        $qrDataUri = (new \chillerlan\QRCode\QRCode($qrOptions))->render($qrData);

        // Stamp image from private disk
        $stampPath = storage_path('app/private/authority/signature.png');
        $stampDataUri = file_exists($stampPath)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($stampPath))
            : null;

        $pdf = Pdf::loadView('pdf.candidate-transcript', compact(
            'candidate',
            'user',
            'exam',
            'school',
            'speciality',
            'testCenter',
            'subjects',
            'computedAverage',
            'totalCoefficient',
            'mention',
            'totalWeightedPoints',
            'highestGrade',
            'lowestGrade',
            'qrDataUri',
            'stampDataUri',
        ));

        // Configuration pour une seule page A4
        $pdf->setPaper('A4', 'portrait');
        
        // Options essentielles pour un rendu parfait
        $pdf->setOptions([
            'defaultFont' => 'DejaVu Sans',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'dpi' => 96,
            'enable_php' => true,
            'enable_javascript' => true,
            'debugCss' => false,
            'isFontSubsettingEnabled' => true,
        ]);
        
        // Pour forcer le contenu sur une seule page
        $pdf->getDomPDF()->set_option('enable_php', true);

        $relativePath = 'transcripts/releve_' . ($candidate->matricule ?? $candidate->id) . '.pdf';
        Storage::disk('public')->put($relativePath, $pdf->output());

        $this->command->info('Transcript preview generated:');
        $this->command->line(' - File: ' . storage_path('app/public/' . $relativePath));
        $this->command->line(' - URL: /storage/' . $relativePath . ' (requires php artisan storage:link)');
    }

    private function generateConvocationPreview(int $candidateId): void
    {
        $candidate = Candidate::with([
            'student.user',
            'student.examSchool.school',
            'student.examSchool.exam',
            'speciality.specialitySubjects.subject',
            'speciality.grade',
            'speciality.serie',
            'testCenter',
        ])->find($candidateId);

        if (! $candidate) {
            $this->command->warn('Cannot generate convocation preview: candidate not found.');
            return;
        }

        $student = $candidate->student;
        $user = $student?->user;
        $examSchool = $student?->examSchool;
        $exam = $examSchool?->exam;
        $school = $examSchool?->school;
        $testCenter = $candidate->testCenter;
        $speciality = $candidate->speciality;

        if (! $user || ! $exam || ! $speciality) {
            $this->command->warn('Cannot generate convocation preview: missing relations.');
            return;
        }

        \Carbon\Carbon::setLocale('fr');
        $examSession = $exam->start_date?->format('Y') ?? now()->format('Y');
        $examDateText = $exam->start_date?->translatedFormat('d/m/Y') ?? 'N/A';
        $startHour = $exam->start_date?->format('H:i') ?? '--:--';
        $convocationCode = sprintf('BAC-%s-%s', $examSession, str_pad((string) $candidate->id, 5, '0', STR_PAD_LEFT));

        $specialityName = $speciality->code ?? 'N/A';
        $programRows = [];

        foreach ($speciality->specialitySubjects as $specSubject) {
            $subject = $specSubject->subject;
            if (! $subject) continue;
            $programRows[] = [
                'date' => $examDateText,
                'time' => $startHour,
                'subject' => $subject->label,
                'type' => $subject->type,
                'duration' => 'Coef. ' . $specSubject->coefficient,
            ];
        }

        if ($programRows === []) {
            $programRows[] = [
                'date' => $examDateText,
                'time' => $startHour,
                'subject' => (string) $exam->title,
                'type' => 'Ecrit',
                'duration' => 'N/A',
            ];
        }

        // QR code
        $qrData = sprintf('CAND-%s-%d', $candidate->matricule, $candidate->id);
        $qrOptions = new \chillerlan\QRCode\QROptions;
        $qrOptions->outputInterface = \chillerlan\QRCode\Output\QRGdImagePNG::class;
        $qrOptions->scale = 5;
        $qrOptions->outputBase64 = true;
        $qrCodeDataUri = (new \chillerlan\QRCode\QRCode($qrOptions))->render($qrData);

        // Stamp
        $stampPath = storage_path('app/private/authority/signature.png');
        $authorityStampDataUri = file_exists($stampPath)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($stampPath))
            : null;

        $viewData = [
            'candidate' => $candidate,
            'fullName' => trim($user->name . ' ' . $user->firstname),
            'name' => (string) $user->name,
            'firstname' => (string) $user->firstname,
            'matricule' => (string) $candidate->matricule,
            'tableNumber' => (string) $candidate->table_number,
            'examTitle' => (string) $exam->title,
            'examPeriod' => 'Du ' . ucfirst($exam->start_date->isoFormat('dddd D')) . ' au ' . ucfirst($exam->end_date->isoFormat('dddd D MMMM YYYY')),
            'testCenterTitle' => (string) ($testCenter->title ?? '-'),
            'testCenterLocation' => (string) ($testCenter->location_indication ?? ''),
            'schoolName' => (string) ($school->name ?? '-'),
            'specialityName' => $specialityName,
            'examSession' => $examSession,
            'testCenterCode' => (string) ($testCenter->code ?? ''),
            'roomLabel' => 'Salle ' . (string) $candidate->table_number,
            'arrivalText' => sprintf('Arrivee obligatoire avant %s', $startHour),
            'convocationCode' => $convocationCode,
            'programRows' => $programRows,
            'qrCodeDataUri' => $qrCodeDataUri,
            'authorityStampDataUri' => $authorityStampDataUri,
            'emissionDate' => now()->translatedFormat('d M Y'),
        ];

        $pdf = Pdf::loadView('pdfs.invitation', $viewData);
        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'defaultFont' => 'DejaVu Sans',
            'isHtml5ParserEnabled' => true,
            'dpi' => 96,
        ]);

        $relativePath = 'convocations/convocation_' . ($candidate->matricule ?? $candidate->id) . '.pdf';
        Storage::disk('public')->put($relativePath, $pdf->output());

        $this->command->info('Convocation preview generated:');
        $this->command->line(' - File: ' . storage_path('app/public/' . $relativePath));
        $this->command->line(' - URL: /storage/' . $relativePath . ' (requires php artisan storage:link)');
    }
}
