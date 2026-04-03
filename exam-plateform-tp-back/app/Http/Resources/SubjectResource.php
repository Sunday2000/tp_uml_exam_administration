<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'code' => $this->code,
            'type' => $this->type,
            'specialities' => $this->whenLoaded('specialities', function () {
                return $this->specialities->map(function ($speciality) {
                    return [
                        'id' => $speciality->id,
                        'grade_id' => $speciality->grade_id,
                        'serie_id' => $speciality->serie_id,
                        'code' => $speciality->code,
                        'coefficient' => (float) $speciality->pivot->coefficient,
                    ];
                });
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
