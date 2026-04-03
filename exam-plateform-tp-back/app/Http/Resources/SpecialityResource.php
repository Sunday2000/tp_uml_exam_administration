<?php

namespace App\Http\Resources;

use App\Http\Resources\GradeResource;
use App\Http\Resources\SerieResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpecialityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'grade_id' => $this->grade_id,
            'serie_id' => $this->serie_id,
            'code' => $this->code,
            'grade' => new GradeResource($this->whenLoaded('grade')),
            'serie' => new SerieResource($this->whenLoaded('serie')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}