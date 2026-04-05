<?php

namespace App\Services;

use App\Models\School;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SchoolCreationService
{
    public function createSchoolWithOwner(array $payload): User
    {
        return DB::transaction(function () use ($payload) {
            $school = School::create([
                'name' => $payload['school']['name'],
                'latitude' => $payload['school']['latitude'] ?? null,
                'longitude' => $payload['school']['longitude'] ?? null,
                'authorization' => $payload['school']['authorization'],
                'phone' => $payload['school']['phone'] ?? null,
                'creation_date' => $payload['school']['creation_date'],
                'status' => $payload['school']['status'] ?? null,
            ]);

            $user = User::create([
                'name' => $payload['name'],
                'firstname' => $payload['firstname'],
                'email' => $payload['email'],
                'phone_number' => $payload['phone_number'] ?? null,
                'password' => $payload['password'],
                'school_id' => $school->id,
                'is_active' => true,
            ]);

            $user->assignRole('Ecole');

            return $user->load('school');
        });
    }
}
