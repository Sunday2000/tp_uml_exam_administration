<?php

namespace Database\Factories;

use App\Models\TestCenter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TestCenter>
 */
class TestCenterFactory extends Factory
{
    protected $model = TestCenter::class;

    public function definition(): array
    {
        return [
            'title' => fake()->company(),
            'code' => strtoupper(fake()->unique()->bothify('TC-###')),
            'longitude' => fake()->longitude(),
            'latitude' => fake()->latitude(),
            'location_indication' => fake()->streetAddress(),
            'seating_capacity' => fake()->numberBetween(50, 1000),
        ];
    }
}
