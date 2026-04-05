<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExamSchoolResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'exam_id' => $this->exam_id,
            'school_id' => $this->school_id,
            'subscription_date' => $this->subscription_date,
            'subscriptor_id' => $this->subscriptor_id,
            'exam' => new ExamResource($this->whenLoaded('exam')),
            'school' => new SchoolResource($this->whenLoaded('school')),
            'students_count' => $this->whenCounted('students'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}
