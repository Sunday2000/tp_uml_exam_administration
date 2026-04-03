<?php

namespace Database\Factories;

use App\Models\Speciality;
use App\Models\SpecialitySubject;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SpecialitySubject>
 */
class SpecialitySubjectFactory extends Factory
{
    protected $model = SpecialitySubject::class;

    public function definition(): array
    {
        return [
            'speciality_id' => Speciality::factory(),
            'subject_id' => Subject::factory(),
            'coefficient' => fake()->randomFloat(2, 1, 10),
        ];
    }
}
