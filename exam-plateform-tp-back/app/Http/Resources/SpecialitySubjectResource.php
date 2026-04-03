<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialitySubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'speciality_id' => $this->speciality_id,
            'subject_id' => $this->subject_id,
            'coefficient' => (float) $this->coefficient,
            'speciality' => new SpecialityResource($this->whenLoaded('speciality')),
            'subject' => new SubjectResource($this->whenLoaded('subject')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
