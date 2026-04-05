<?php

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subject>
 */
class SubjectFactory extends Factory
{
    protected $model = Subject::class;

    public function definition(): array
    {
        return [
            'label' => fake()->unique()->words(2, true),
            'code' => strtoupper(fake()->unique()->bothify('SUB-###')),
            'type' => fake()->randomElement(Subject::TYPES),
        ];
    }
}
