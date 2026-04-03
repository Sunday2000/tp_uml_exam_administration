<?php

namespace Database\Factories;

use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<School>
 */
class SchoolFactory extends Factory
{
    protected $model = School::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'latitude' => fake()->latitude(),
            'longitude' => fake()->longitude(),
            'authorization' => fake()->bothify('AUT-####'),
            'creation_date' => fake()->date(),
        ];
    }
}
