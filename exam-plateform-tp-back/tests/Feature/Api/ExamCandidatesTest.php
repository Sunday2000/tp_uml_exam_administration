<?php

namespace Tests\Feature\Api;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\TestCenter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExamCandidatesTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    public function test_exam_show_returns_candidates_and_schools(): void
    {
        // Create exam
        $exam = Exam::factory()->create(['user_id' => $this->user->id]);

        // Create speciality
        $speciality = Speciality::factory()->create();

        // Create test center
        $testCenter = TestCenter::factory()->create();

        // Create school and examschool
        $school = \App\Models\School::factory()->create();
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
        ]);

        // Create student
        $student = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);

        // Create candidate
        $candidate = Candidate::factory()->create([
            'student_id' => $student->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
        ]);

        // Make request
        $response = $this->getJson("/api/exams/{$exam->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'status',
                'candidates' => [
                    '*' => [
                        'id',
                        'user_id',
                        'student_id',
                        'exam_school_id',
                        'name',
                        'firstname',
                        'school_id',
                        'school_name',
                        'speciality_id',
                        'speciality_name',
                        'test_center_id',
                        'test_center_name',
                    ]
                ],
                'schools' => [
                    '*' => [
                        'school_id',
                        'school_name',
                        'exam_school_id',
                    ]
                ],
            ]
        ]);

        // Verify data
        $data = $response->json('data');
        $this->assertCount(1, $data['candidates']);
        $this->assertCount(1, $data['schools']);

        // Check candidate data
        $candidates = $data['candidates'];
        $this->assertEquals($candidate->id, $candidates[0]['id']);
        $this->assertEquals($student->user_id, $candidates[0]['user_id']);
        $this->assertEquals($student->id, $candidates[0]['student_id']);
        $this->assertEquals($school->id, $candidates[0]['school_id']);
        $this->assertEquals($school->name, $candidates[0]['school_name']);
        $this->assertEquals($speciality->id, $candidates[0]['speciality_id']);
        $this->assertEquals($testCenter->title, $candidates[0]['test_center_name']);

        // Check school data
        $schools = $data['schools'];
        $this->assertEquals($school->id, $schools[0]['school_id']);
        $this->assertEquals($school->name, $schools[0]['school_name']);
        $this->assertEquals($examSchool->id, $schools[0]['exam_school_id']);
    }

    public function test_exam_show_with_multiple_candidates(): void
    {
        // Create exam
        $exam = Exam::factory()->create(['user_id' => $this->user->id]);

        // Create specialities
        $specialities = Speciality::factory(2)->create();

        // Create test centers
        $testCenters = TestCenter::factory(2)->create();

        // Create schools and examschools
        $schools = \App\Models\School::factory(2)->create();
        $examSchools = [];
        foreach ($schools as $school) {
            $examSchools[] = ExamSchool::factory()->create([
                'exam_id' => $exam->id,
                'school_id' => $school->id,
            ]);
        }

        // Create students and candidates
        foreach ($examSchools as $examSchool) {
            for ($i = 0; $i < 2; $i++) {
                $student = Student::factory()->create([
                    'exam_school_id' => $examSchool->id,
                ]);

                Candidate::factory()->create([
                    'student_id' => $student->id,
                    'speciality_id' => $specialities->random()->id,
                    'test_center_id' => $testCenters->random()->id,
                ]);
            }
        }

        // Make request
        $response = $this->getJson("/api/exams/{$exam->id}");

        $response->assertStatus(200);
        $data = $response->json('data');

        // Check counts
        $this->assertCount(4, $data['candidates']);
        $this->assertCount(2, $data['schools']);
    }

    public function test_exam_show_returns_null_test_center_when_not_assigned(): void
    {
        // Create exam
        $exam = Exam::factory()->create(['user_id' => $this->user->id]);

        // Create necessary data
        $speciality = Speciality::factory()->create();
        $school = \App\Models\School::factory()->create();
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
        ]);

        // Create student
        $student = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);

        // Create candidate without test center
        $candidate = Candidate::factory()->create([
            'student_id' => $student->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => null,
        ]);

        // Make request
        $response = $this->getJson("/api/exams/{$exam->id}");

        $response->assertStatus(200);
        $data = $response->json('data');

        $this->assertNull($data['candidates'][0]['test_center_id']);
        $this->assertNull($data['candidates'][0]['test_center_name']);
    }
}
