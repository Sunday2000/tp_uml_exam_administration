<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Exam>
 */
class ExamFactory extends Factory
{
    protected $model = Exam::class;

    public function definition(): array
    {
        $startDate = fake()->dateTimeBetween('+1 day', '+30 days');
        $endDate = (clone $startDate)->modify('+1 day');

        return [
            'title' => fake()->sentence(3),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'user_id' => User::factory(),
            'status' => Exam::STATUS_PENDING,
            'registration_deadline' => fake()->dateTimeBetween('now', '+15 days')->format('Y-m-d'),
        ];
    }
}
