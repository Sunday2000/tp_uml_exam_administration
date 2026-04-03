<?php

namespace Tests\Feature\Api;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentRegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected ExamSchool $examSchool;
    protected Speciality $speciality;

    protected function setUp(): void
    {
        parent::setUp();

        $user = User::factory()->create();
        $exam = Exam::factory()->create(['user_id' => $user->id]);
        $school = \App\Models\School::factory()->create();
        $this->examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
        ]);

        $this->speciality = Speciality::factory()->create();

        // Link speciality to exam
        $exam->specialities()->attach($this->speciality);
    }

    public function test_register_student_creates_student_and_candidate(): void
    {
        $payload = [
            'exam_school_id' => $this->examSchool->id,
            'speciality_id' => $this->speciality->id,
            'user' => [
                'name' => 'Doe',
                'firstname' => 'John',
                'email' => 'john@example.com',
                'phone_number' => '1234567890',
            ],
            'student' => [
                'code' => 'STD-001',
                'guardian_name' => 'Guardian',
                'guardian_surname' => 'Name',
                'guardian_phone' => '0987654321',
            ],
        ];

        $response = $this->postJson('/api/students', $payload);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'data' => [
                'id',
                'code',
                'user' => [
                    'id',
                    'name',
                    'firstname',
                    'email',
                ],
                'candidate' => [
                    'id',
                    'matricule',
                    'speciality',
                ],
                'exam_school' => [
                    'id',
                ],
            ],
            'meta' => ['user_reused'],
        ]);

        // Check student created
        $this->assertDatabaseHas('students', [
            'exam_school_id' => $this->examSchool->id,
            'code' => 'STD-001',
        ]);

        // Check candidate created
        $student = Student::where('code', 'STD-001')->first();
        $this->assertDatabaseHas('candidates', [
            'student_id' => $student->id,
            'speciality_id' => $this->speciality->id,
        ]);

        // Check user not reused yet
        $data = $response->json('data');
        $this->assertFalse($response->json('meta.user_reused'));
    }

    public function test_register_student_reuses_existing_user_by_email(): void
    {
        // Create existing user
        $existingUser = User::factory()->create([
            'email' => 'john@example.com',
        ]);

        $payload = [
            'exam_school_id' => $this->examSchool->id,
            'speciality_id' => $this->speciality->id,
            'user' => [
                'name' => 'NewName',
                'firstname' => 'NewFirstname',
                'email' => 'john@example.com',
                'phone_number' => '9999999999',
            ],
            'student' => [
                'code' => 'STD-002',
                'guardian_name' => 'Guardian',
                'guardian_surname' => 'Name',
                'guardian_phone' => '0987654321',
            ],
        ];

        $response = $this->postJson('/api/students', $payload);

        $response->assertStatus(201);

        // Check user wasn't duplicated
        $this->assertEquals(1, User::where('email', 'john@example.com')->count());

        // Check user reused flag
        $this->assertTrue($response->json('meta.user_reused'));
    }

    public function test_register_student_fails_if_speciality_not_linked_to_exam(): void
    {
        // Create another speciality not linked to exam
        $otherSpeciality = Speciality::factory()->create();

        $payload = [
            'exam_school_id' => $this->examSchool->id,
            'speciality_id' => $otherSpeciality->id,
            'user' => [
                'name' => 'Doe',
                'firstname' => 'John',
                'email' => 'john@example.com',
                'phone_number' => '1234567890',
            ],
            'student' => [
                'code' => 'STD-003',
                'guardian_name' => 'Guardian',
                'guardian_surname' => 'Name',
                'guardian_phone' => '0987654321',
            ],
        ];

        $response = $this->postJson('/api/students', $payload);

        $response->assertStatus(422);
        $response->assertJson([
            'message' => 'Speciality is not attached to this exam.',
        ]);
    }

    public function test_student_does_not_have_school_id_attribute(): void
    {
        $payload = [
            'exam_school_id' => $this->examSchool->id,
            'speciality_id' => $this->speciality->id,
            'user' => [
                'name' => 'Doe',
                'firstname' => 'John',
                'email' => 'john@example.com',
                'phone_number' => '1234567890',
            ],
            'student' => [
                'code' => 'STD-004',
                'guardian_name' => 'Guardian',
                'guardian_surname' => 'Name',
                'guardian_phone' => '0987654321',
            ],
        ];

        $response = $this->postJson('/api/students', $payload);

        $response->assertStatus(201);

        $student = Student::where('code', 'STD-004')->first();

        // Verify school_id is null (not set)
        $this->assertNull($student->getAttribute('school_id'));

        // Verify exam_school_id is set
        $this->assertNotNull($student->exam_school_id);
        $this->assertEquals($this->examSchool->id, $student->exam_school_id);
    }

    public function test_candidate_does_not_have_exam_id_attribute(): void
    {
        $payload = [
            'exam_school_id' => $this->examSchool->id,
            'speciality_id' => $this->speciality->id,
            'user' => [
                'name' => 'Doe',
                'firstname' => 'John',
                'email' => 'john@example.com',
                'phone_number' => '1234567890',
            ],
            'student' => [
                'code' => 'STD-005',
                'guardian_name' => 'Guardian',
                'guardian_surname' => 'Name',
                'guardian_phone' => '0987654321',
            ],
        ];

        $response = $this->postJson('/api/students', $payload);

        $response->assertStatus(201);

        $student = Student::where('code', 'STD-005')->first();
        $candidate = $student->candidate;

        // Verify exam_id is null (not set)
        $this->assertNull($candidate->getAttribute('exam_id'));

        // Verify test_center_id exists (can be null)
        $this->assertNull($candidate->test_center_id);

        // Access exam through chain
        $exam = $candidate->student->examSchool->exam;
        $this->assertNotNull($exam);
    }
}
