<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\ExamSchool;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StudentSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $examSchools = ExamSchool::query()->get();
        $specialities = Speciality::query()->get();

        if ($examSchools->isEmpty() || $specialities->isEmpty()) {
            return;
        }

        $studentCodes = [
            'STD-001',
            'STD-002',
            'STD-003',
            'STD-004',
            'STD-005',
            'STD-006',
            'STD-007',
            'STD-008',
            'STD-009',
            'STD-010',
        ];

        foreach ($studentCodes as $code) {
            $examSchool = $examSchools->random();
            $speciality = $specialities->random();

            // Create or update user
            $user = User::updateOrCreate(
                ['email' => 'student' . strtolower(str_replace('-', '', $code)) . '@example.com'],
                [
                    'name' => 'Doe',
                    'firstname' => 'Student ' . $code,
                    'email' => 'student' . strtolower(str_replace('-', '', $code)) . '@example.com',
                    'password' => bcrypt('password123'),
                    'is_active' => true,
                ]
            );

            // Create student
            $student = Student::updateOrCreate(
                [
                    'exam_school_id' => $examSchool->id,
                    'code' => $code,
                ],
                [
                    'user_id' => $user->id,
                    'guardian_name' => fake()->lastName(),
                    'guardian_surname' => fake()->firstName(),
                    'guardian_phone' => fake()->phoneNumber(),
                ]
            );

            // Create candidate
            Candidate::updateOrCreate(
                ['student_id' => $student->id],
                [
                    'matricule' => 'MAT-' . now()->format('Y') . '-' . strtoupper(Str::random(8)),
                    'speciality_id' => $speciality->id,
                    'test_center_id' => null,
                ]
            );
        }
    }
}
