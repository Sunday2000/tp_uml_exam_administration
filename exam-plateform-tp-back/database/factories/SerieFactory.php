<?php

namespace Database\Factories;

use App\Models\Serie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Serie>
 */
class SerieFactory extends Factory
{
    protected $model = Serie::class;

    public function definition(): array
    {
        return [
            'label' => strtoupper(fake()->unique()->bothify('?##')),
            'description' => fake()->sentence(),
        ];
    }
}