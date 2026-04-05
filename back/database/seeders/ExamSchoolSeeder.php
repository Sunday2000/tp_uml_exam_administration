<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExamSchoolSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::query()->where('email', 'jevahe9504@qvmao.com')->first();

        if (! $user) {
            return;
        }

        $exams = Exam::query()->get();
        $schools = School::query()->get();

        if ($exams->isEmpty() || $schools->isEmpty()) {
            return;
        }

        foreach ($exams as $exam) {
            foreach ($schools as $school) {
                ExamSchool::updateOrCreate(
                    [
                        'exam_id' => $exam->id,
                        'school_id' => $school->id,
                    ],
                    [
                        'subscription_date' => now(),
                        'subscriptor_id' => $user->id,
                    ],
                );
            }
        }
    }
}
