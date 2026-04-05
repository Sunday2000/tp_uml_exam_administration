<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateSubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'candidate_id' => $this->candidate_id,
            'speciality_subject_id' => $this->speciality_subject_id,
            'exam_grade' => $this->exam_grade,
            'absent' => $this->absent,
            'speciality_subject' => $this->speciality_subject,
            'candidate' => new CandidateResource($this->whenLoaded('candidate')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
