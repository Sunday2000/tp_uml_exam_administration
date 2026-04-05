<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\CandidateSubject;
use App\Models\SpecialitySubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CandidateSubjectController extends Controller
{
    /**
     * Get grade overview for an exam + speciality.
     *
     * Returns: candidates list, speciality subjects, submission stats.
     */
    public function gradeOverview(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'speciality_id' => ['required', 'integer', 'exists:specialities,id'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
        ]);

        $examId = $validated['exam_id'];
        $specialityId = $validated['speciality_id'];
        $perPage = $validated['per_page'] ?? 15;

        // Base query for candidates belonging to this exam AND this speciality
        $candidateQuery = Candidate::query()
            ->where('speciality_id', $specialityId)
            ->whereHas('student.examSchool', function ($q) use ($examId) {
                $q->where('exam_id', $examId);
            });

        // Get speciality subjects for this speciality
        $specialitySubjects = SpecialitySubject::where('speciality_id', $specialityId)
            ->with('subject')
            ->get();

        $specialitySubjectIds = $specialitySubjects->pluck('id');

        // Compute stats on ALL candidates (before pagination)
        $allCandidateIds = (clone $candidateQuery)->pluck('id');
        $totalCandidates = $allCandidateIds->count();
        $totalSubjects = $specialitySubjects->count();
        $totalExpectedGrades = $totalCandidates * $totalSubjects;

        $submittedGradesCount = CandidateSubject::whereIn('candidate_id', $allCandidateIds)
            ->whereIn('speciality_subject_id', $specialitySubjectIds)
            ->where(function ($q) {
                $q->whereNotNull('exam_grade')
                    ->orWhere('absent', true);
            })
            ->count();

        $absentCount = CandidateSubject::whereIn('candidate_id', $allCandidateIds)
            ->whereIn('speciality_subject_id', $specialitySubjectIds)
            ->where('absent', true)
            ->count();

        $pendingGrades = $totalExpectedGrades - $submittedGradesCount;
        $submissionRate = $totalExpectedGrades > 0
            ? round(($submittedGradesCount / $totalExpectedGrades) * 100, 2)
            : 0;

        // Paginate candidates with their existing grades
        $paginatedCandidates = $candidateQuery
            ->with([
                'student.user:id,name,firstname',
                'candidateSubjects.specialitySubjectRelation.subject:id,label,code,type',
            ])
            ->orderBy('id')
            ->paginate($perPage);

        $paginatedCandidates->getCollection()->transform(function (Candidate $candidate) {
            return [
                'id' => $candidate->id,
                'name' => $candidate->student?->user?->name,
                'firstname' => $candidate->student?->user?->firstname,
                'table_number' => $candidate->table_number,
                'matricule' => $candidate->matricule,
                'candidate_subjects' => $candidate->candidateSubjects->map(function ($cs) {
                    $rel = $cs->specialitySubjectRelation;
                    return [
                        'id' => $cs->id,
                        'speciality_subject_id' => $cs->speciality_subject_id,
                        'exam_grade' => $cs->exam_grade,
                        'absent' => $cs->absent,
                        'coefficient' => $rel ? (float) $rel->coefficient : null,
                        'subject' => $rel && $rel->subject ? [
                            'id' => $rel->subject->id,
                            'label' => $rel->subject->label,
                            'code' => $rel->subject->code,
                            'type' => $rel->subject->type,
                        ] : null,
                    ];
                }),
            ];
        });

        return response()->json([
            'candidates' => $paginatedCandidates,
            'speciality_subjects' => $specialitySubjects->map(function ($ss) {
                return [
                    'id' => $ss->id,
                    'speciality_id' => $ss->speciality_id,
                    'subject_id' => $ss->subject_id,
                    'coefficient' => (float) $ss->coefficient,
                    'subject' => $ss->subject ? [
                        'id' => $ss->subject->id,
                        'label' => $ss->subject->label,
                        'code' => $ss->subject->code,
                        'type' => $ss->subject->type,
                    ] : null,
                ];
            }),
            'stats' => [
                'total_candidates' => $totalCandidates,
                'total_subjects' => $totalSubjects,
                'total_expected_grades' => $totalExpectedGrades,
                'submitted_grades' => $submittedGradesCount,
                'pending_grades' => $pendingGrades,
                'absent_count' => $absentCount,
                'submission_rate' => $submissionRate,
            ],
        ]);
    }

    /**
     * Save grades for candidates on a given subject.
     *
     * Expects: exam_id, speciality_subject_id,
     *          grades: [{ candidate_id, grade, absent }]
     */
    public function saveGrades(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => ['required', 'integer', 'exists:exams,id'],
            'speciality_subject_id' => ['required', 'integer', 'exists:speciality_subjects,id'],
            'grades' => ['required', 'array', 'min:1'],
            'grades.*.candidate_id' => ['required', 'integer', 'exists:candidates,id'],
            'grades.*.grade' => ['nullable', 'numeric', 'min:0'],
            'grades.*.absent' => ['sometimes', 'boolean'],
        ]);

        $examId = $validated['exam_id'];
        $specialitySubjectId = $validated['speciality_subject_id'];

        $specialitySubject = SpecialitySubject::findOrFail($specialitySubjectId);

        // Snapshot of the speciality_subject data to store as JSON
        $snapshot = [
            'id' => $specialitySubject->id,
            'speciality_id' => $specialitySubject->speciality_id,
            'subject_id' => $specialitySubject->subject_id,
            'coefficient' => (float) $specialitySubject->coefficient,
        ];

        // Get valid candidate IDs for this exam + speciality (derived from speciality_subject)
        $validCandidateIds = Candidate::where('speciality_id', $specialitySubject->speciality_id)
            ->whereHas('student.examSchool', function ($q) use ($examId) {
                $q->where('exam_id', $examId);
            })
            ->pluck('id')
            ->toArray();

        $saved = [];

        DB::transaction(function () use ($validated, $specialitySubjectId, $snapshot, $validCandidateIds, &$saved) {
            foreach ($validated['grades'] as $entry) {
                $candidateId = $entry['candidate_id'];

                if (!in_array($candidateId, $validCandidateIds)) {
                    continue;
                }

                $isAbsent = $entry['absent'] ?? false;

                $candidateSubject = CandidateSubject::updateOrCreate(
                    [
                        'candidate_id' => $candidateId,
                        'speciality_subject_id' => $specialitySubjectId,
                    ],
                    [
                        'exam_grade' => $isAbsent ? null : ($entry['grade'] ?? null),
                        'absent' => $isAbsent,
                        'speciality_subject' => $snapshot,
                    ]
                );

                $saved[] = $candidateSubject;
            }
        });

        return response()->json([
            'message' => count($saved) . ' grade(s) saved successfully.',
            'saved_count' => count($saved),
        ]);
    }
}
