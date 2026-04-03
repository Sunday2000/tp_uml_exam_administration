<?php

namespace Database\Factories;

use App\Models\Grade;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Grade>
 */
class GradeFactory extends Factory
{
    protected $model = Grade::class;

    public function definition(): array
    {
        return [
            'label' => fake()->unique()->word(),
            'code' => strtoupper(fake()->unique()->bothify('GR##??')),
            'description' => fake()->sentence(),
        ];
    }
}