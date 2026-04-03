<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'matricule' => $this->matricule,
            'speciality_id' => $this->speciality_id,
            'student_id' => $this->student_id,
            'test_center_id' => $this->test_center_id,
            'exam_average' => $this->exam_average,
            'jury_id' => $this->jury_id,
            'deliberation' => $this->deliberation,
            'deliberation_date' => $this->deliberation_date,
            'table_number' => $this->table_number,
            'deliberation_status' => $this->deliberation_status,
            'mention' => $this->mention,
            'speciality' => new SpecialityResource($this->whenLoaded('speciality')),
            'student' => new StudentResource($this->whenLoaded('student')),
            'test_center' => $this->whenLoaded('testCenter', function () {
                return [
                    'id' => $this->testCenter->id,
                    'name' => $this->testCenter->title,
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
