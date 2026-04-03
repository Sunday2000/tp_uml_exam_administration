<?php

namespace App\Http\Resources;

use App\Http\Resources\SpecialityResource;
use App\Http\Resources\TestCenterResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $presentedByExamSchoolId = [];
        $assignedByTestCenterId = [];

        if ($this->relationLoaded('examSchools')) {
            foreach ($this->examSchools as $examSchool) {
                $presentedCount = 0;

                foreach ($examSchool->students as $student) {
                    if (! $student->candidate) {
                        continue;
                    }

                    $presentedCount++;

                    if ($student->candidate->test_center_id) {
                        $centerId = (int) $student->candidate->test_center_id;
                        $assignedByTestCenterId[$centerId] = ($assignedByTestCenterId[$centerId] ?? 0) + 1;
                    }
                }

                $presentedByExamSchoolId[(int) $examSchool->id] = $presentedCount;
            }
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'status' => $this->status,
            'registration_deadline' => $this->registration_deadline,
            'user_id' => $this->user_id,
            'creator' => $this->whenLoaded('creator', function () {
                return [
                    'id' => $this->creator->id,
                    'name' => $this->creator->name,
                    'firstname' => $this->creator->firstname,
                    'email' => $this->creator->email,
                ];
            }),
            'test_centers' => $this->whenLoaded('testCenters', function () use ($assignedByTestCenterId, $request) {
                return $this->testCenters->map(function ($testCenter) use ($assignedByTestCenterId, $request) {
                    $assignedCount = (int) ($assignedByTestCenterId[(int) $testCenter->id] ?? 0);
                    $capacity = (int) ($testCenter->seating_capacity ?? 0);
                    $completionPercent = $capacity > 0
                        ? round(($assignedCount / $capacity) * 100, 2)
                        : 0.0;

                    return array_merge(
                        (new TestCenterResource($testCenter))->resolve($request),
                        [
                            'assigned_candidates_count' => $assignedCount,
                            'capacity_completion_percent' => $completionPercent,
                        ]
                    );
                })->values();
            }),
            'specialities' => SpecialityResource::collection($this->whenLoaded('specialities')),
            'schools' => $this->whenLoaded('examSchools', function () use ($presentedByExamSchoolId) {
                return $this->examSchools->map(function ($examSchool) use ($presentedByExamSchoolId) {
                    return [
                        'school_id' => $examSchool->school_id,
                        'school_name' => $examSchool->school->name,
                        'exam_school_id' => $examSchool->id,
                        'presented_candidates_count' => (int) ($presentedByExamSchoolId[(int) $examSchool->id] ?? 0),
                        'responsible' => $examSchool->school->responsible ? [
                            'id' => $examSchool->school->responsible->id,
                            'name' => $examSchool->school->responsible->name,
                            'firstname' => $examSchool->school->responsible->firstname,
                            'email' => $examSchool->school->responsible->email,
                            'school_id' => $examSchool->school->responsible->school_id,
                        ] : null,
                    ];
                });
            }),
            'candidates' => $this->whenLoaded('examSchools', function () {
                $candidates = [];
                foreach ($this->examSchools as $examSchool) {
                    $examSchool->loadMissing([
                        'students.user',
                        'students.candidate.speciality',
                        'students.candidate.testCenter',
                    ]);

                    foreach ($examSchool->students as $student) {
                        if ($student->candidate) {
                            $candidate = $student->candidate;
                            $candidates[] = [
                                'id' => $candidate->id,
                                'user_id' => $student->user_id,
                                'matricule' => $candidate->matricule,
                                'student_id' => $student->id,
                                'exam_school_id' => $examSchool->id,
                                'table_number' => $candidate->table_number,
                                'name' => $student->user->name,
                                'firstname' => $student->user->firstname,
                                'school_id' => $examSchool->school_id,
                                'school_name' => $examSchool->school->name,
                                'speciality_id' => $candidate->speciality_id,
                                'speciality_name' => $candidate->speciality?->code,
                                'test_center_id' => $candidate->test_center_id,
                                'test_center_name' => $candidate->testCenter?->title,
                            ];
                        }
                    }
                }
                return $candidates;
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
