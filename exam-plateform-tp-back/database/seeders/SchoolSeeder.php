<?php

namespace Database\Seeders;

use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Lycée Delacroix',
                'latitude' => 36.737232,
                'longitude' => 3.086472,
                'authorization' => 'AUT-2024-001',
                'phone' => '021 123 4567',
                'creation_date' => '2010-01-15',
                'owner' => [
                    'name' => 'Delacroix',
                    'firstname' => 'Directeur',
                    'email' => 'owner.delacroix@example.com',
                    'phone_number' => '021 123 4567',
                ],
            ],
            [
                'name' => 'Lycée Ibn Sina',
                'latitude' => 35.067633,
                'longitude' => 1.313364,
                'authorization' => 'AUT-2024-002',
                'phone' => '041 234 5678',
                'creation_date' => '2012-03-20',
                'owner' => [
                    'name' => 'Ibn Sina',
                    'firstname' => 'Directeur',
                    'email' => 'owner.ibnsina@example.com',
                    'phone_number' => '041 234 5678',
                ],
            ],
            [
                'name' => 'Lycée Emir Abdelkader',
                'latitude' => 36.369160,
                'longitude' => 6.633356,
                'authorization' => 'AUT-2024-003',
                'phone' => '031 345 6789',
                'creation_date' => '2015-06-10',
                'owner' => [
                    'name' => 'Emir Abdelkader',
                    'firstname' => 'Directeur',
                    'email' => 'owner.emirabdelkader@example.com',
                    'phone_number' => '031 345 6789',
                ],
            ],
        ];

        foreach ($schools as $payload) {
            $schoolData = $payload;
            $ownerData = $schoolData['owner'];
            unset($schoolData['owner']);

            $school = School::updateOrCreate(
                ['authorization' => $schoolData['authorization']],
                $schoolData,
            );

            $owner = User::updateOrCreate(
                ['email' => $ownerData['email']],
                [
                    'name' => $ownerData['name'],
                    'firstname' => $ownerData['firstname'],
                    'email' => $ownerData['email'],
                    'phone_number' => $ownerData['phone_number'] ?? null,
                    'password' => 'password123',
                    'school_id' => $school->id,
                    'is_active' => true,
                ],
            );

            $owner->assignRole('Ecole');
        }
    }
}
