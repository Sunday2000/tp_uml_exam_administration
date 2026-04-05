<?php

namespace Database\Factories;

use App\Models\Candidate;
use App\Models\Speciality;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Candidate>
 */
class CandidateFactory extends Factory
{
    protected $model = Candidate::class;

    public function definition(): array
    {
        return [
            'matricule' => 'MAT-' . now()->format('Y') . '-' . strtoupper(Str::random(8)),
            'test_center_id' => null,
            'speciality_id' => Speciality::factory(),
            'exam_average' => null,
            'jury_id' => null,
            'deliberation' => null,
            'deliberation_date' => null,
            'table_number' => null,
            'deliberation_status' => null,
            'mention' => null,
            'student_id' => Student::factory(),
        ];
    }
}
