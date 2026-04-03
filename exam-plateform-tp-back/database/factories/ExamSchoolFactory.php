<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\School;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ExamSchool>
 */
class ExamSchoolFactory extends Factory
{
    protected $model = ExamSchool::class;

    public function definition(): array
    {
        return [
            'exam_id' => Exam::factory(),
            'school_id' => School::factory(),
            'subscription_date' => now(),
            'subscriptor_id' => User::factory(),
        ];
    }
}
