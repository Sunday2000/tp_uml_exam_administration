<?php

namespace App\Http\Resources;

use App\Http\Resources\SchoolResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'firstname' => $this->firstname,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
            'profile_picture' => $this->profile_picture,
            'is_active' => $this->is_active,
            'roles' => $this->getRoleNames(),
            'school' => new SchoolResource($this->whenLoaded('school')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
