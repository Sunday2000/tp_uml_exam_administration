<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\ExamSpeciality;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ExamSpeciality>
 */
class ExamSpecialityFactory extends Factory
{
    protected $model = ExamSpeciality::class;

    public function definition(): array
    {
        return [
            'exam_id' => Exam::factory(),
            'speciality_id' => Speciality::factory(),
            'subscription_date' => now(),
            'subscriptor_id' => User::factory(),
        ];
    }
}
