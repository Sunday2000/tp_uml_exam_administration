<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $examSessions = $this->whenLoaded('examSchools', function () {
            return $this->examSchools->map(static function ($examSchool): array {
                return [
                    'exam_school_id' => $examSchool->id,
                    'exam_id' => $examSchool->exam_id,
                    'exam_title' => $examSchool->exam?->title,
                    'exam_status' => $examSchool->exam?->status,
                    'subscription_date' => $examSchool->subscription_date,
                    'presented_candidates_count' => (int) ($examSchool->students_count ?? 0),
                ];
            })->values();
        });

        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'authorization' => $this->authorization,
            'phone' => $this->phone,
            'creation_date' => $this->creation_date,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'responsible' => new UserResource($this->whenLoaded('responsible')),
            'exams_subscribed_count' => $this->whenCounted('examSchools'),
            'ongoing_exams_count' => $this->whenCounted('ongoingExamSchools'),
            'candidates_count' => $this->whenCounted('studentsViaExams'),
            'total_exam_sessions_subscribed' => $this->whenCounted('examSchools'),
            'total_candidates' => $this->whenCounted('studentsViaExams'),
            'exam_sessions' => $examSessions,
        ];
    }
}
