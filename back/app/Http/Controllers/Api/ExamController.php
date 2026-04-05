<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CandidateResource;
use App\Http\Resources\ExamResource;
use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSpeciality;
use App\Models\ExamTestCenter;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class ExamController extends Controller
{
    public function index()
    {
        return ExamResource::collection(Exam::with(['creator', 'testCenters', 'specialities'])->orderByDesc('id')->get());
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'registration_deadline' => ['nullable', 'date'],
            'status' => ['sometimes', Rule::in(Exam::STATUSES)],
        ]);

        $exam = Exam::create([
            'title' => $validated['title'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'registration_deadline' => $validated['registration_deadline'] ?? null,
            'status' => $validated['status'] ?? Exam::STATUS_PENDING,
            'user_id' => $request->user()->id,
        ]);

        return (new ExamResource($exam->load(['creator', 'testCenters', 'specialities'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Exam $exam): ExamResource
    {
        return new ExamResource($exam->load([
            'creator',
            'testCenters',
            'specialities',
            'specialities.grade:id,label,code',
            'specialities.serie:id,label',
            'examSchools.school',
            'examSchools.school.responsible:id,name,email,firstname,school_id',
            'examSchools.students.user',
            'examSchools.students.candidate.speciality',
            'examSchools.students.candidate.testCenter',
        ]));
    }

    public function update(Request $request, Exam $exam): ExamResource
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['sometimes', 'required', 'date', 'after_or_equal:start_date'],
            'registration_deadline' => ['nullable', 'date'],
            'status' => ['sometimes', Rule::in(Exam::STATUSES)],
        ]);

        $exam->update($validated);

        return new ExamResource($exam->fresh()->load(['creator', 'testCenters', 'specialities']));
    }

    public function destroy(Exam $exam): Response
    {
        if ($exam->hasChildren()) {
            $exam->delete();
        } else {
            $exam->forceDelete();
        }

        return response()->noContent();
    }

    public function changeStatus(Request $request, Exam $exam): ExamResource
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(Exam::STATUSES)],
        ]);

        $exam->update(['status' => $validated['status']]);

        return new ExamResource($exam->fresh()->load(['creator', 'testCenters', 'specialities']));
    }

    public function syncTestCenters(Request $request, Exam $exam): ExamResource
    {
        $validated = $request->validate([
            'test_center_ids' => ['required', 'array'],
            'test_center_ids.*' => ['integer', 'exists:test_centers,id'],
        ]);

        DB::transaction(function () use ($exam, $validated, $request) {
            $desiredIds = array_values(array_unique(array_map('intval', $validated['test_center_ids'])));

            foreach ($desiredIds as $testCenterId) {
                $existing = ExamTestCenter::withTrashed()
                    ->where('exam_id', $exam->id)
                    ->where('test_center_id', $testCenterId)
                    ->first();

                if ($existing) {
                    if ($existing->trashed()) {
                        $existing->restore();
                    }

                    $existing->subscription_date = now();
                    $existing->subscriptor_id = $request->user()->id;
                    $existing->save();
                } else {
                    ExamTestCenter::create([
                        'exam_id' => $exam->id,
                        'test_center_id' => $testCenterId,
                        'subscription_date' => now(),
                        'subscriptor_id' => $request->user()->id,
                    ]);
                }
            }

            $currentLinks = ExamTestCenter::query()->where('exam_id', $exam->id)->get();

            foreach ($currentLinks as $link) {
                if (in_array((int) $link->test_center_id, $desiredIds, true)) {
                    continue;
                }

                if ($link->hasChildren()) {
                    $link->delete();
                } else {
                    $link->forceDelete();
                }
            }
        });

        return new ExamResource($exam->fresh()->load(['creator', 'testCenters', 'specialities']));
    }

    public function syncSpecialities(Request $request, Exam $exam): ExamResource
    {
        $validated = $request->validate([
            'speciality_ids' => ['required', 'array'],
            'speciality_ids.*' => ['integer', 'exists:specialities,id'],
        ]);

        DB::transaction(function () use ($exam, $validated, $request) {
            $desiredIds = array_values(array_unique(array_map('intval', $validated['speciality_ids'])));

            foreach ($desiredIds as $specialityId) {
                $existing = ExamSpeciality::withTrashed()
                    ->where('exam_id', $exam->id)
                    ->where('speciality_id', $specialityId)
                    ->first();

                if ($existing) {
                    if ($existing->trashed()) {
                        $existing->restore();
                    }

                    $existing->subscription_date = now();
                    $existing->subscriptor_id = $request->user()->id;
                    $existing->save();
                } else {
                    ExamSpeciality::create([
                        'exam_id' => $exam->id,
                        'speciality_id' => $specialityId,
                        'subscription_date' => now(),
                        'subscriptor_id' => $request->user()->id,
                    ]);
                }
            }

            $currentLinks = ExamSpeciality::query()->where('exam_id', $exam->id)->get();

            foreach ($currentLinks as $link) {
                if (in_array((int) $link->speciality_id, $desiredIds, true)) {
                    continue;
                }

                if ($link->hasChildren()) {
                    $link->delete();
                } else {
                    $link->forceDelete();
                }
            }
        });

        return new ExamResource($exam->fresh()->load(['creator', 'testCenters', 'specialities']));
    }

    /**
     * Deliberation board: full exam overview with specialities, stats and candidates.
     */
    public function deliberationBoard(Request $request, Exam $exam)
    {
        $perPage = (int) ($request->input('per_page', 15));
        $perPage = max(1, min($perPage, 100));

        // 1. Exam specialities with serie & grade
        $examSpecialities = ExamSpeciality::where('exam_id', $exam->id)
            ->with('speciality.serie:id,label', 'speciality.grade:id,label')
            ->get()
            ->map(fn ($es) => [
                'id' => $es->id,
                'speciality_id' => $es->speciality_id,
                'speciality' => $es->speciality ? [
                    'id' => $es->speciality->id,
                    'code' => $es->speciality->code,
                    'serie' => $es->speciality->serie ? [
                        'id' => $es->speciality->serie->id,
                        'label' => $es->speciality->serie->label,
                    ] : null,
                    'grade' => $es->speciality->grade ? [
                        'id' => $es->speciality->grade->id,
                        'label' => $es->speciality->grade->label,
                    ] : null,
                ] : null,
            ]);

        // 2. Base query for all candidates of this exam
        $baseQuery = Candidate::query()
            ->whereHas('student.examSchool', fn ($q) => $q->where('exam_id', $exam->id));

        // Compute statistics on ALL candidates (before pagination)
        $statsQuery = (clone $baseQuery)->with([
            'candidateSubjects',
        ])->get();

        $totalCandidates = $statsQuery->count();

        $fullyAbsentCount = $statsQuery->filter(function ($c) {
            $cs = $c->candidateSubjects;
            return $cs->isNotEmpty() && $cs->every(fn ($s) => $s->absent);
        })->count();

        $successfulCount = $statsQuery->where('deliberation', 'Admis')->count();
        $postponedCount = $statsQuery->where('deliberation', 'Ajourné')->count();
        $deliberatedCount = $statsQuery->whereNotNull('deliberation')->count();

        $successRate = $totalCandidates > 0
            ? round(($successfulCount / $totalCandidates) * 100, 2)
            : 0;

        $deliberationRate = $totalCandidates > 0
            ? round(($deliberatedCount / $totalCandidates) * 100, 2)
            : 0;

        // 3. Paginate candidates with relationships
        $paginatedCandidates = $baseQuery
            ->with([
                'student:id,user_id,exam_school_id',
                'student.user:id,name,firstname',
                'speciality:id,code,grade_id,serie_id',
                'speciality.grade:id,label',
                'speciality.serie:id,label',
                'candidateSubjects.specialitySubjectRelation.subject:id,label',
            ])
            ->orderBy('id')
            ->paginate($perPage);

        $paginatedCandidates->getCollection()->transform(function ($candidate) {
            $subjects = $candidate->candidateSubjects->map(function ($cs) {
                $ssRel = $cs->specialitySubjectRelation;
                return [
                    'id' => $cs->id,
                    'exam_grade' => $cs->exam_grade,
                    'absent' => $cs->absent,
                    'coefficient' => $ssRel ? (float) $ssRel->coefficient : null,
                    'subject' => $ssRel && $ssRel->subject ? [
                        'id' => $ssRel->subject->id,
                        'label' => $ssRel->subject->label,
                    ] : null,
                ];
            });

            $gradedSubjects = $candidate->candidateSubjects->filter(
                fn ($cs) => !$cs->absent && $cs->exam_grade !== null && $cs->specialitySubjectRelation
            );

            $totalWeighted = $gradedSubjects->sum(
                fn ($cs) => $cs->exam_grade * $cs->specialitySubjectRelation->coefficient
            );
            $totalCoef = $gradedSubjects->sum(
                fn ($cs) => $cs->specialitySubjectRelation->coefficient
            );

            $computedAverage = $totalCoef > 0 ? round($totalWeighted / $totalCoef, 2) : null;
            $computedMention = Candidate::mentionFromAverage($computedAverage);

            return [
                'id' => $candidate->id,
                'name' => $candidate->student?->user?->name,
                'firstname' => $candidate->student?->user?->firstname,
                'matricule' => $candidate->matricule,
                'table_number' => $candidate->table_number,
                'deliberation' => $candidate->deliberation,
                'mention' => $candidate->mention,
                'exam_average' => $candidate->exam_average,
                'candidate_subjects' => $subjects,
                'computed_average' => $computedAverage,
                'computed_mention' => $computedMention,
                'grade' => $candidate->speciality?->grade ? [
                    'id' => $candidate->speciality->grade->id,
                    'label' => $candidate->speciality->grade->label,
                ] : null,
            ];
        });

        return response()->json([
            'exam_specialities' => $examSpecialities,
            'statistics' => [
                'total_candidates' => $totalCandidates,
                'successful_candidates' => $successfulCount,
                'success_rate' => $successRate,
                'postponed_candidates' => $postponedCount,
                'fully_absent_candidates' => $fullyAbsentCount,
                'deliberation_rate' => $deliberationRate,
            ],
            'candidates' => $paginatedCandidates,
        ]);
    }

    /**
     * Store deliberation outcomes for a batch of candidates belonging to an exam.
     */
    public function storeDeliberations(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'deliberations' => ['required', 'array', 'min:1'],
            'deliberations.*.candidate_id' => ['required', 'integer', 'exists:candidates,id'],
            'deliberations.*.deliberation' => ['required', 'string', 'in:Admis,Ajourné'],
        ]);

        $examId = $validated['exam_id'];

        $candidateIds = collect($validated['deliberations'])
            ->pluck('candidate_id')
            ->map(fn ($id) => (int) $id)
            ->unique()
            ->values();

        // Keep only candidates that actually belong to the provided exam.
        $candidatesById = Candidate::query()
            ->whereIn('id', $candidateIds)
            ->whereHas('student.examSchool', fn ($q) => $q->where('exam_id', $examId))
            ->with(['candidateSubjects.specialitySubjectRelation'])
            ->get()
            ->keyBy('id');

        $updated = 0;

        DB::transaction(function () use ($validated, $candidatesById, &$updated) {
            foreach ($validated['deliberations'] as $entry) {
                $candidateId = (int) $entry['candidate_id'];
                $candidate = $candidatesById->get($candidateId);

                if (! $candidate) {
                    continue;
                }

                $gradedSubjects = $candidate->candidateSubjects->filter(
                    fn ($cs) => ! $cs->absent && $cs->exam_grade !== null && $cs->specialitySubjectRelation
                );

                $totalWeighted = $gradedSubjects->sum(
                    fn ($cs) => $cs->exam_grade * $cs->specialitySubjectRelation->coefficient
                );
                $totalCoef = $gradedSubjects->sum(
                    fn ($cs) => $cs->specialitySubjectRelation->coefficient
                );

                $computedAverage = $totalCoef > 0 ? round($totalWeighted / $totalCoef, 2) : null;
                $computedMention = Candidate::mentionFromAverage($computedAverage);

                $candidate->update([
                    'deliberation' => $entry['deliberation'],
                    'deliberation_date' => now(),
                    'exam_average' => $computedAverage,
                    'mention' => $computedMention,
                ]);

                $updated++;
            }
        });

        return response()->json([
            'message' => $updated . ' deliberation(s) saved successfully.',
            'updated_count' => $updated,
        ]);
    }

    /**
     * Get all candidates for an exam through the exam_schools -> students -> candidates chain.
     */
    public function candidates(Exam $exam)
    {
        $candidates = DB::table('candidates')
            ->join('students', 'candidates.student_id', '=', 'students.id')
            ->join('exam_schools', 'students.exam_school_id', '=', 'exam_schools.id')
            ->where('exam_schools.exam_id', $exam->id)
            ->select('candidates.*')
            ->get();

        // Hydrate the candidates as Eloquent models to apply relationships
        $modelCandidates = \App\Models\Candidate::hydrate($candidates->toArray());

        return CandidateResource::collection(
            $modelCandidates->load(['student.user', 'speciality', 'testCenter'])
        );
    }

    /**
     * Generate a PDF transcript for a candidate.
     */
    public function candidateTranscript(Request $request)
    {
        $validated = $request->validate([
            'candidate_id' => ['required', 'integer', 'exists:candidates,id'],
        ]);

        $candidate = Candidate::with([
            'student.user',
            'student.examSchool.school',
            'student.examSchool.exam',
            'speciality.grade',
            'speciality.serie',
            'testCenter',
            'candidateSubjects.specialitySubjectRelation.subject',
        ])->findOrFail($validated['candidate_id']);

        $user = $candidate->student?->user;
        $exam = $candidate->student?->examSchool?->exam;
        $school = $candidate->student?->examSchool?->school;
        $speciality = $candidate->speciality;
        $testCenter = $candidate->testCenter;

        // Build subjects data with weighted points
        $totalCoefficient = 0;
        $totalWeightedPoints = 0;
        $grades = [];

        $subjects = $candidate->candidateSubjects->map(function ($cs) use (&$totalCoefficient, &$totalWeightedPoints, &$grades) {
            $relation = $cs->specialitySubjectRelation;
            $coefficient = $relation?->coefficient ?? 0;
            $grade = $cs->exam_grade ?? 0;
            $absent = (bool) $cs->absent;
            $weightedPoints = $absent ? 0 : $grade * $coefficient;

            if (!$absent) {
                $totalCoefficient += $coefficient;
                $totalWeightedPoints += $weightedPoints;
                $grades[] = $grade;
            }

            return [
                'label' => $relation?->subject?->label ?? '—',
                'type' => $relation?->subject?->type ?? '—',
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

        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'defaultFont' => 'DejaVu Sans',
            'isHtml5ParserEnabled' => true,
            'dpi' => 96,
        ]);

        $filename = 'releve_' . ($candidate->matricule ?? $candidate->id) . '.pdf';

        return $pdf->download($filename);
    }
}
