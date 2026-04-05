<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::query()->where('email', 'jevahe9504@qvmao.com')->first();

        if (! $user) {
            $user = User::factory()->create([
                'email' => 'examiner@example.com',
            ]);
        }

        $exams = [
            [
                'title' => 'Examen National 2024 - Littérature',
                'start_date' => now()->addDays(30),
                'end_date' => now()->addDays(32),
                'registration_deadline' => now()->addDays(20),
                'status' => Exam::STATUS_PENDING,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Examen National 2024 - Sciences',
                'start_date' => now()->addDays(35),
                'end_date' => now()->addDays(37),
                'registration_deadline' => now()->addDays(25),
                'status' => Exam::STATUS_PENDING,
                'user_id' => $user->id,
            ],
            [
                'title' => 'Examen National 2024 - Mathématiques',
                'start_date' => now()->addDays(40),
                'end_date' => now()->addDays(42),
                'registration_deadline' => now()->addDays(30),
                'status' => Exam::STATUS_PENDING,
                'user_id' => $user->id,
            ],
        ];

        foreach ($exams as $exam) {
            Exam::updateOrCreate(
                ['title' => $exam['title']],
                $exam,
            );
        }
    }
}
