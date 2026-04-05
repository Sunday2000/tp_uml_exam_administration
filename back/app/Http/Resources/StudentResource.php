<?php

namespace App\Http\Resources;

use App\Http\Resources\CandidateResource;
use App\Http\Resources\ExamSchoolResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'guardian_name' => $this->guardian_name,
            'guardian_surname' => $this->guardian_surname,
            'guardian_phone' => $this->guardian_phone,
            'user_id' => $this->user_id,
            'school_id' => $this->school_id,
            'exam_school_id' => $this->exam_school_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'candidate' => new CandidateResource($this->whenLoaded('candidate')),
            'exam_school' => new ExamSchoolResource($this->whenLoaded('examSchool')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
