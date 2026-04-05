<?php

namespace Database\Factories;

use App\Models\ExamSchool;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'code' => strtoupper(fake()->bothify('STD-####')),
            'guardian_name' => fake()->lastName(),
            'guardian_surname' => fake()->firstName(),
            'guardian_phone' => fake()->phoneNumber(),
            'exam_school_id' => ExamSchool::factory(),
        ];
    }
}
