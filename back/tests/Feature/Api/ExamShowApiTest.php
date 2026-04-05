<?php

namespace Tests\Feature\Api;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\School;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\TestCenter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Tests\TestCase;

class ExamShowApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Exam $exam;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Passport::actingAs($this->user);
        $this->exam = Exam::factory()->create(['user_id' => $this->user->id]);
    }

    public function test_exam_show_returns_schools_with_correct_structure(): void
    {
        // Create schools
        $schools = School::factory(2)->create();

        // Link schools to exam
        foreach ($schools as $school) {
            ExamSchool::factory()->create([
                'exam_id' => $this->exam->id,
                'school_id' => $school->id,
            ]);
        }

        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertStatus(200);
        $data = $response->json('data');

        $this->assertCount(2, $data['schools']);

        foreach ($data['schools'] as $index => $school) {
            $this->assertArrayHasKey('school_id', $school);
            $this->assertArrayHasKey('school_name', $school);
            $this->assertArrayHasKey('exam_school_id', $school);
        }
    }

    public function test_exam_show_returns_empty_candidates_when_no_students(): void
    {
        $school = School::factory()->create();
        ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $school->id,
        ]);

        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertStatus(200);
        $data = $response->json('data');

        $this->assertCount(1, $data['schools']);
        $this->assertCount(0, $data['candidates']);
    }

    public function test_exam_show_returns_school_responsible_as_first_linked_user(): void
    {
        $school = School::factory()->create();

        $firstResponsible = User::factory()->create([
            'school_id' => $school->id,
            'name' => 'First',
            'firstname' => 'Responsible',
            'email' => 'first.responsible@example.test',
        ]);

        User::factory()->create([
            'school_id' => $school->id,
            'name' => 'Second',
            'firstname' => 'Responsible',
            'email' => 'second.responsible@example.test',
        ]);

        ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $school->id,
        ]);

        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertStatus(200)
            ->assertJsonPath('data.schools.0.responsible.id', $firstResponsible->id)
            ->assertJsonPath('data.schools.0.responsible.name', 'First')
            ->assertJsonPath('data.schools.0.responsible.firstname', 'Responsible')
            ->assertJsonPath('data.schools.0.responsible.email', 'first.responsible@example.test')
            ->assertJsonPath('data.schools.0.responsible.school_id', $school->id);
    }

    public function test_exam_show_returns_candidates_through_relationship_chain(): void
    {
        // Create required data
        $school = School::factory()->create();
        $speciality = Speciality::factory()->create();
        $testCenter = TestCenter::factory()->create();

        // Link speciality to exam
        $this->exam->specialities()->attach($speciality);

        // Create exam school
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $school->id,
        ]);

        // Create student and candidate
        $student = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);

        $candidate = Candidate::factory()->create([
            'student_id' => $student->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
        ]);

        // Make request
        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertStatus(200);
        $data = $response->json('data');

        // Verify candidate is returned
        $this->assertCount(1, $data['candidates']);
        $candidateData = $data['candidates'][0];

        $this->assertEquals($candidate->id, $candidateData['id']);
        $this->assertEquals($student->user_id, $candidateData['user_id']);
        $this->assertEquals($student->id, $candidateData['student_id']);
        $this->assertEquals($examSchool->id, $candidateData['exam_school_id']);
        $this->assertEquals($student->user->name, $candidateData['name']);
        $this->assertEquals($student->user->firstname, $candidateData['firstname']);
        $this->assertEquals($school->id, $candidateData['school_id']);
        $this->assertEquals($school->name, $candidateData['school_name']);
        $this->assertEquals($speciality->id, $candidateData['speciality_id']);
        $this->assertEquals($speciality->code, $candidateData['speciality_name']);
        $this->assertEquals($testCenter->id, $candidateData['test_center_id']);
        $this->assertEquals($testCenter->title, $candidateData['test_center_name']);
    }

    public function test_exam_show_returns_complete_api_response_structure(): void
    {
        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'start_date',
                'end_date',
                'status',
                'registration_deadline',
                'user_id',
                'creator' => [
                    'id',
                    'name',
                    'firstname',
                    'email',
                ],
                'test_centers',
                'specialities',
                'schools' => [],
                'candidates' => [],
                'created_at',
                'updated_at',
            ]
        ]);
    }

    public function test_exam_show_returns_school_presented_count_and_test_center_completion_metrics(): void
    {
        $schoolOne = School::factory()->create();
        $schoolTwo = School::factory()->create();

        $examSchoolOne = ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $schoolOne->id,
        ]);

        $examSchoolTwo = ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $schoolTwo->id,
        ]);

        $centerA = TestCenter::factory()->create(['seating_capacity' => 4]);
        $centerB = TestCenter::factory()->create(['seating_capacity' => 2]);

        $this->exam->testCenters()->attach([$centerA->id, $centerB->id]);

        $speciality = Speciality::factory()->create();

        $studentOne = Student::factory()->create(['exam_school_id' => $examSchoolOne->id]);
        $studentTwo = Student::factory()->create(['exam_school_id' => $examSchoolOne->id]);
        $studentThree = Student::factory()->create(['exam_school_id' => $examSchoolTwo->id]);

        Candidate::factory()->create([
            'student_id' => $studentOne->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $centerA->id,
        ]);

        Candidate::factory()->create([
            'student_id' => $studentTwo->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $centerA->id,
        ]);

        Candidate::factory()->create([
            'student_id' => $studentThree->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $centerB->id,
        ]);

        $response = $this->getJson("/api/exams/{$this->exam->id}");

        $response->assertOk();
        $payload = $response->json('data');

        $schoolsByExamSchoolId = collect($payload['schools'])->keyBy('exam_school_id');
        $this->assertSame(2, $schoolsByExamSchoolId[$examSchoolOne->id]['presented_candidates_count']);
        $this->assertSame(1, $schoolsByExamSchoolId[$examSchoolTwo->id]['presented_candidates_count']);

        $centersById = collect($payload['test_centers'])->keyBy('id');
        $this->assertSame(2, $centersById[$centerA->id]['assigned_candidates_count']);
        $this->assertEquals(50.0, $centersById[$centerA->id]['capacity_completion_percent']);
        $this->assertSame(1, $centersById[$centerB->id]['assigned_candidates_count']);
        $this->assertEquals(50.0, $centersById[$centerB->id]['capacity_completion_percent']);
    }

    public function test_get_exam_candidates_endpoint(): void
    {
        // Create required data
        $school = School::factory()->create();
        $speciality = Speciality::factory()->create();

        // Link speciality to exam
        $this->exam->specialities()->attach($speciality);

        // Create exam school
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $this->exam->id,
            'school_id' => $school->id,
        ]);

        // Create students and candidates
        for ($i = 0; $i < 3; $i++) {
            $student = Student::factory()->create([
                'exam_school_id' => $examSchool->id,
            ]);

            Candidate::factory()->create([
                'student_id' => $student->id,
                'speciality_id' => $speciality->id,
            ]);
        }

        // Make request to candidates endpoint
        $response = $this->getJson("/api/exams/{$this->exam->id}/candidates");

        $response->assertStatus(200);
        $candidates = $response->json('data');

        $this->assertCount(3, $candidates);
    }
}
