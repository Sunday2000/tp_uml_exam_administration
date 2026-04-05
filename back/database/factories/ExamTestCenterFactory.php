<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\ExamTestCenter;
use App\Models\TestCenter;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ExamTestCenter>
 */
class ExamTestCenterFactory extends Factory
{
    protected $model = ExamTestCenter::class;

    public function definition(): array
    {
        return [
            'exam_id' => Exam::factory(),
            'test_center_id' => TestCenter::factory(),
            'subscription_date' => now(),
            'subscriptor_id' => User::factory(),
        ];
    }
}
