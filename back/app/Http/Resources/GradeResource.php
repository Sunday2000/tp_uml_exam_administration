<?php

namespace App\Http\Resources;

use App\Http\Resources\SerieResource;
use App\Http\Resources\SpecialityResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GradeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'label' => $this->label,
            'code' => $this->code,
            'description' => $this->description,
            'specialities' => SpecialityResource::collection($this->whenLoaded('specialities')),
            'series' => SerieResource::collection($this->whenLoaded('series')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
        ];
    }
}