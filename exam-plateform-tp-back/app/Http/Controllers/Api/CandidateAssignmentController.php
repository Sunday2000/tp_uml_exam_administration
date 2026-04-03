<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\ExamTestCenter;
use App\Models\Student;
use App\Models\TestCenter;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use chillerlan\QRCode\{QRCode, QROptions};
use chillerlan\QRCode\Output\QRGdImagePNG;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class CandidateAssignmentController extends Controller
{
    public function assignTestCenter(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'test_center_id' => ['required', 'integer', 'exists:test_centers,id'],
            'candidate_id' => ['required', 'integer', 'exists:candidates,id'],
        ]);

        try {
            $result = DB::transaction(function () use ($validated): array {
                $candidate = Candidate::query()
                    ->with(['student.examSchool', 'student.examSchool.exam', 'testCenter'])
                    ->findOrFail((int) $validated['candidate_id']);
                $examSchool = $candidate->student->examSchool;
                $testCenter = TestCenter::query()->findOrFail((int) $validated['test_center_id']);

                if ((int) $candidate->student->exam_school_id !== (int) $examSchool->id) {
                    abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Candidate does not belong to provided exam school.');
                }

                $centerAttachedToExam = ExamTestCenter::query()
                    ->where('exam_id', (int) $examSchool->exam_id)
                    ->where('test_center_id', (int) $testCenter->id)
                    ->exists();

                if (! $centerAttachedToExam) {
                    abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Test center is not attached the exam.');
                }

                $this->ensureCenterCapacityForExam(
                    examId: (int) $examSchool->exam_id,
                    testCenter: $testCenter,
                    candidate: $candidate,
                );

                $tableNumber = $candidate->table_number;
                if (! $tableNumber || $this->isTableNumberUsedByAnotherCandidate((int) $examSchool->exam_id, $tableNumber, (int) $candidate->id)) {
                    $tableNumber = $this->nextTableNumber((int) $examSchool->exam_id, $testCenter);
                }

                $candidate->update([
                    'test_center_id' => (int) $testCenter->id,
                    'table_number' => $tableNumber,
                ]);

                return [
                    'candidate' => $candidate->fresh()->load(['student.user', 'testCenter']),
                    'exam_school_id' => (int) $examSchool->id,
                ];
            });
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
            ], $exception->getStatusCode());
        }

        return response()->json([
            'message' => 'Test center assigned successfully.',
            'data' => [
                'exam_school_id' => $result['exam_school_id'],
                'candidate_id' => $result['candidate']->id,
                'test_center_id' => $result['candidate']->test_center_id,
                'table_number' => $result['candidate']->table_number,
            ],
        ]);
    }

    public function autoAssignByExam(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
        ]);

        $exam = Exam::query()->findOrFail((int) $validated['exam_id']);

        $result = DB::transaction(function () use ($exam): array {
            $centers = TestCenter::query()
                ->select('test_centers.*')
                ->join('exam_test_centers', 'exam_test_centers.test_center_id', '=', 'test_centers.id')
                ->where('exam_test_centers.exam_id', (int) $exam->id)
                ->orderBy('test_centers.id')
                ->get();

            if ($centers->isEmpty()) {
                return [
                    'assigned' => 0,
                    'not_assigned' => 0,
                    'errors' => ['No test centers attached to this exam.'],
                ];
            }

            $assignedCounts = Candidate::query()
                ->selectRaw('candidates.test_center_id, COUNT(*) as total')
                ->join('students', 'students.id', '=', 'candidates.student_id')
                ->join('exam_schools', 'exam_schools.id', '=', 'students.exam_school_id')
                ->where('exam_schools.exam_id', (int) $exam->id)
                ->whereNotNull('candidates.test_center_id')
                ->groupBy('candidates.test_center_id')
                ->pluck('total', 'candidates.test_center_id');

            $centerSlots = [];
            foreach ($centers as $center) {
                $alreadyAssigned = (int) ($assignedCounts[(int) $center->id] ?? 0);
                $remaining = max(0, (int) $center->seating_capacity - $alreadyAssigned);
                $centerSlots[] = [
                    'center_id' => (int) $center->id,
                    'remaining' => $remaining,
                ];
            }

            $candidates = Candidate::query()
                ->whereHas('student.examSchool', static function ($query) use ($exam): void {
                    $query->where('exam_id', (int) $exam->id);
                })
                ->with('student')
                ->orderBy('id')
                ->get();

            $assigned = 0;
            $notAssigned = 0;

            foreach ($candidates as $candidate) {
                $availableIndices = [];
                foreach ($centerSlots as $index => $slot) {
                    if ($slot['remaining'] > 0) {
                        $availableIndices[] = $index;
                    }
                }

                if (empty($availableIndices)) {
                    $notAssigned++;
                    continue;
                }

                $slotIndex = $availableIndices[array_rand($availableIndices)];

                $examId = (int) $exam->id;
                $testCenterId = $centerSlots[$slotIndex]['center_id'];
                $testCenter = $centers->where('id', $testCenterId)->first();
                $tableNumber = $candidate->table_number;

                if (! $tableNumber || $this->isTableNumberUsedByAnotherCandidate($examId, $tableNumber, (int) $candidate->id)) {
                    $tableNumber = $this->nextTableNumber($examId, $testCenter);
                }

                $candidate->update([
                    'test_center_id' => $testCenterId,
                    'table_number' => $tableNumber,
                ]);

                $centerSlots[$slotIndex]['remaining']--;
                $assigned++;
            }

            return [
                'assigned' => $assigned,
                'not_assigned' => $notAssigned,
                'errors' => [],
            ];
        });

        if ($result['errors'] !== []) {
            return response()->json([
                'message' => 'Automatic assignment failed.',
                'data' => $result,
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        return response()->json([
            'message' => 'Automatic assignment completed.',
            'data' => $result,
        ]);
    }

    public function attendanceListByCenter(Request $request): Response
    {
        $validated = $request->validate([
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'test_center_id' => ['required', 'integer', 'exists:test_centers,id'],
        ]);

        $exam = Exam::query()->findOrFail((int) $validated['exam_id']);
        $testCenter = TestCenter::query()->findOrFail((int) $validated['test_center_id']);

        $centerAttachedToExam = ExamTestCenter::query()
            ->where('exam_id', (int) $exam->id)
            ->where('test_center_id', (int) $testCenter->id)
            ->exists();

        if (! $centerAttachedToExam) {
            return response()->json([
                'message' => 'Test center is not attached to this exam.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $candidates = Candidate::query()
            ->where('test_center_id', (int) $testCenter->id)
            ->whereHas('student.examSchool', static function ($query) use ($exam): void {
                $query->where('exam_id', (int) $exam->id);
            })
            ->with('student.user')
            ->orderBy('table_number')
            ->orderBy('id')
            ->get();

        $attendanceRows = $candidates->map(static function (Candidate $candidate): array {
            return [
                'name' => (string) $candidate->student->user->name,
                'firstname' => (string) $candidate->student->user->firstname,
                'matricule' => (string) $candidate->matricule,
            ];
        })->values();

        $pdf = Pdf::loadView('pdfs.attendance-list', [
            'examTitle' => $exam->title,
            'testCenterTitle' => $testCenter->title,
            'rows' => $attendanceRows,
            'generatedAt' => now(),
        ])->setPaper('a4', 'portrait');

        $safeExam = preg_replace('/[^a-z0-9]+/i', '-', (string) $exam->title) ?: 'exam';
        $safeCenter = preg_replace('/[^a-z0-9]+/i', '-', (string) $testCenter->title) ?: 'center';
        $filename = sprintf('attendance-%s-%s.pdf', trim($safeExam, '-'), trim($safeCenter, '-'));

        return $pdf->stream($filename);
    }

    public function downloadInvitation(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => ['required', 'integer', 'exists:candidates,id'],
        ]);

        $candidate = Candidate::query()
            ->with([
                'student.user',
                'student.examSchool.exam',
                'student.examSchool.school',
                'speciality.specialitySubjects.subject',
                'speciality.grade',
                'speciality.serie',
                'testCenter',
            ])
            ->findOrFail((int) $validated['candidate_id']);

        if ($candidate->test_center_id === null || $candidate->table_number === null) {
            return response()->json([
                'message' => 'Candidate must be assigned to a test center with a table number before invitation generation.',
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $pdf = Pdf::loadView('pdfs.invitation', $this->buildInvitationViewData($candidate))
            ->setPaper('a4', 'portrait');

        $pdf->setOptions([
            'defaultFont' => 'DejaVu Sans',
            'isHtml5ParserEnabled' => true,
            'dpi' => 96,
        ]);

        $safeMatricule = preg_replace('/[^a-z0-9-]+/i', '-', (string) $candidate->matricule) ?: (string) $candidate->id;
        $filename = sprintf('convocation-%s.pdf', trim($safeMatricule, '-'));

        return response($pdf->output(), Response::HTTP_OK, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => sprintf('attachment; filename="%s"', $filename),
        ]);
    }

    private function buildInvitationViewData(Candidate $candidate): array
    {
        $student = $candidate->student;
        $user = $student->user;
        $examSchool = $student->examSchool;
        $exam = $examSchool->exam;
        $school = $examSchool->school;
        $testCenter = $candidate->testCenter;
        $speciality = $candidate->speciality;
        $examSession = $exam->start_date?->format('Y') ?? now()->format('Y');
        $examDateText = $exam->start_date?->translatedFormat('d/m/Y') ?? 'N/A';
        $startHour = $exam->start_date?->format('H:i') ?? '--:--';
        $convocationCode = sprintf('BAC-%s-%s', $examSession, str_pad((string) $candidate->id, 5, '0', STR_PAD_LEFT));

        $specialityName = 'N/A';
        $programRows = [];

        if ($speciality) {
            $specialityName = $speciality->code;
            foreach ($speciality->specialitySubjects as $specSubject) {
                $subject = $specSubject->subject;
                if (! $subject) {
                    continue;
                }
                $programRows[] = [
                    'date' => $examDateText,
                    'time' => $startHour,
                    'subject' => $subject->label,
                    'type' => $subject->type,
                    'duration' => 'Coef. ' . $specSubject->coefficient,
                ];
            }
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

        $qrData = sprintf('CAND-%s-%d', $candidate->matricule, $candidate->id);
        Carbon::setLocale('fr');
        return [
            'candidate' => $candidate,
            'fullName' => trim((string) $user->name . ' ' . (string) $user->firstname),
            'name' => (string) $user->name,
            'firstname' => (string) $user->firstname,
            'matricule' => (string) $candidate->matricule,
            'tableNumber' => (string) $candidate->table_number,
            'examTitle' => (string) $exam->title,
            'examDate' => $exam->start_date?->format('d/m/Y H:i') ?? 'N/A',
            'examPeriod' => 'Du ' . ucfirst($exam->start_date->isoFormat('dddd D')) . ' au ' . ucfirst($exam->end_date->isoFormat('dddd D MMMM YYYY')),
            'testCenterTitle' => (string) $testCenter->title,
            'testCenterLocation' => (string) ($testCenter->location_indication ?? ''),
            'schoolName' => (string) $school->name,
            'specialityName' => $specialityName,
            'examSession' => $examSession,
            'testCenterCode' => (string) $testCenter->code,
            'roomLabel' => 'Salle ' . (string) $candidate->table_number,
            'arrivalText' => sprintf('Arrivee obligatoire avant %s', $startHour),
            'convocationCode' => $convocationCode,
            'programRows' => $programRows,
            'profilePictureDataUri' => $this->profilePictureDataUri((string) $user->profile_picture),
            'authorityStampDataUri' => $this->profilePictureDataUri('authority/signature.png'),
            'qrCodeDataUri' => $this->generateQrCodeDataUri($qrData),
            'headerBgDataUri' => $this->generateFabricTextureDataUri(),
            'emissionDate' => now()->translatedFormat('d M Y'),
        ];
    }

    private function generateQrCodeDataUri(string $data): string
    {
        $options = new QROptions([
            'outputInterface' => QRGdImagePNG::class,
            'scale' => 5,
            'outputBase64' => true,
            'bgColor' => [255, 255, 255],
            'imageTransparent' => false,
        ]);

        return (new QRCode($options))->render($data);
    }

    private function generateFabricTextureDataUri(): string
    {
        $width = 800;
        $height = 200;
        $img = imagecreatetruecolor($width, $height);

        // Enable alpha
        imagealphablending($img, true);
        imagesavealpha($img, true);

        // Base colors (dark blue palette from your image)
        $color1 = [12, 45, 78];   // deep blue
        $color2 = [5, 20, 40];    // darker blue
        $accent = [30, 80, 140];  // lighter blue

        // ---- Gradient background ----
        for ($y = 0; $y < $height; $y++) {
            $ratio = $y / $height;

            $r = (int)($color1[0] * (1 - $ratio) + $color2[0] * $ratio);
            $g = (int)($color1[1] * (1 - $ratio) + $color2[1] * $ratio);
            $b = (int)($color1[2] * (1 - $ratio) + $color2[2] * $ratio);

            $color = imagecolorallocate($img, $r, $g, $b);
            imageline($img, 0, $y, $width, $y, $color);
        }

        // ---- Diagonal overlay (like your design) ----
        $overlayColor = imagecolorallocatealpha($img, 20, 60, 110, 90);
        imagefilledpolygon($img, [
            $width * 0.4, 0,
            $width * 0.7, 0,
            $width * 0.5, $height,
            $width * 0.2, $height
        ], 4, $overlayColor);

        // ---- Soft circular patterns (top-right curves effect) ----
        for ($i = 0; $i < 3; $i++) {
            $alpha = 100 + ($i * 10);
            $circleColor = imagecolorallocatealpha($img, 255, 255, 255, $alpha);

            imagearc(
                $img,
                $width - 50,
                50,
                200 + ($i * 60),
                200 + ($i * 60),
                0,
                360,
                $circleColor
            );
        }

        // ---- Noise (fabric grain effect) ----
        for ($i = 0; $i < ($width * $height) / 20; $i++) {
            $x = rand(0, $width - 1);
            $y = rand(0, $height - 1);

            $noise = rand(-10, 10);

            $r = max(0, min(255, $color1[0] + $noise));
            $g = max(0, min(255, $color1[1] + $noise));
            $b = max(0, min(255, $color1[2] + $noise));

            $color = imagecolorallocatealpha($img, $r, $g, $b, 110);
            imagesetpixel($img, $x, $y, $color);
        }

        // ---- Output buffer ----
        ob_start();
        imagepng($img);
        $imageData = ob_get_clean();

        imagedestroy($img);

        return 'data:image/png;base64,' . base64_encode($imageData);
    }

    private function profilePictureDataUri(string $rawPath): ?string
    {
        $path = trim($rawPath);
        if ($path === '') {
            return null;
        }

        if (! Storage::disk('private')->exists($path)) {
            return null;
        }

        $content = Storage::disk('private')->get($path);
        if ($content === null) {
            return null;
        }

        $finfo = new \finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->buffer($content) ?: 'image/jpeg';

        return sprintf('data:%s;base64,%s', $mimeType, base64_encode($content));
    }

    private function ensureCenterCapacityForExam(int $examId, TestCenter $testCenter, Candidate $candidate): void
    {
        $assignedCount = Candidate::query()
            ->where('test_center_id', (int) $testCenter->id)
            ->whereHas('student.examSchool', static function ($query) use ($examId): void {
                $query->where('exam_id', $examId);
            })
            ->count();

        $alreadyAssignedToCenter = (int) $candidate->test_center_id === (int) $testCenter->id;

        if (! $alreadyAssignedToCenter && $assignedCount >= (int) $testCenter->seating_capacity) {
            abort(Response::HTTP_UNPROCESSABLE_ENTITY, 'Test center capacity exceeded for this exam.');
        }
    }

    private function nextTableNumber(int $examId, TestCenter $testCenter): string
    {
        // Get all table numbers for this exam with the same test center code prefix
        $prefix = $testCenter->code;
        $usedNumbers = Candidate::query()
            ->whereHas('student.examSchool', static function ($query) use ($examId): void {
                $query->where('exam_id', $examId);
            })
            ->where('test_center_id', (int) $testCenter->id)
            ->whereNotNull('candidates.table_number')
            ->lockForUpdate()
            ->pluck('candidates.table_number')
            ->filter(static function (string $num): bool {
                return !empty($num); // Filter empty values
            })
            ->all();

        // Extract digits from existing table numbers with this prefix
        $usedDigits = [];
        foreach ($usedNumbers as $tableNumber) {
            if (str_starts_with($tableNumber, $prefix)) {
                $digit = substr($tableNumber, strlen($prefix));
                if (is_numeric($digit)) {
                    $usedDigits[(int) $digit] = true;
                }
            }
        }

        // Find the next available digit
        $digit = 1;
        while (isset($usedDigits[$digit])) {
            $digit++;
        }

        return $prefix . $digit;
    }

    private function isTableNumberUsedByAnotherCandidate(int $examId, string $tableNumber, int $candidateId): bool
    {
        return Candidate::query()
            ->whereHas('student.examSchool', static function ($query) use ($examId): void {
                $query->where('exam_id', $examId);
            })
            ->where('candidates.table_number', $tableNumber)
            ->where('candidates.id', '!=', $candidateId)
            ->exists();
    }
}
