<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentExamSessionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $exam     = $this->student?->examSchool?->exam;
        $school   = $this->student?->examSchool?->school;
        $spec     = $this->speciality;

        return [
            'id' => $this->id,
            'exam' => $exam ? [
                'id'                    => $exam->id,
                'title'                 => $exam->title,
                'status'                => $exam->status,
                'start_date'            => $exam->start_date,
                'end_date'              => $exam->end_date,
                'registration_deadline' => $exam->registration_deadline,
            ] : null,

            'matricule' => $this->matricule,

            'speciality' => $spec ? [
                'code'  => $spec->code,
                'grade' => $spec->grade?->label,
                'serie' => $spec->serie?->label,
            ] : null,

            'school' => $school ? [
                'id'   => $school->id,
                'name' => $school->name,
                'code' => $school->code,
            ] : null,

            'test_center' => $this->testCenter ? [
                'id'   => $this->testCenter->id,
                'name' => $this->testCenter->title,
                'code' => $this->testCenter->code,
            ] : null,

            'exam_average'       => $this->exam_average,
            'mention'            => $this->mention,
            'deliberation'       => $this->deliberation,
            'deliberation_status'=> $this->deliberation_status,
            'deliberation_date'  => $this->deliberation_date,
        ];
    }
}
