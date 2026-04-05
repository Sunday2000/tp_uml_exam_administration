<?php

namespace Database\Factories;

use App\Models\Grade;
use App\Models\Serie;
use App\Models\Speciality;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Speciality>
 */
class SpecialityFactory extends Factory
{
    protected $model = Speciality::class;

    public function definition(): array
    {
        return [
            'grade_id' => Grade::factory(),
            'serie_id' => Serie::factory(),
        ];
    }
}