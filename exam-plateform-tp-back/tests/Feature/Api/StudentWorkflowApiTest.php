<?php

namespace Tests\Feature\Api;

use App\Models\School;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class StudentWorkflowApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        foreach (['Administrateur', 'Correcteur', 'Jury', 'Ecole'] as $roleName) {
            Role::findOrCreate($roleName, 'api');
        }
    }

    private function authenticate(): User
    {
        $createdUser = User::factory()->createOne();
        $user = User::query()->findOrFail($createdUser->id);
        Passport::actingAs($user);

        return $user;
    }

    #[Test]
    public function school_store_uses_owner_payload_and_creates_user_linked_to_school(): void
    {
        $this->authenticate();

        $response = $this->postJson('/api/schools', [
            'name' => 'OwnerLastName',
            'firstname' => 'OwnerFirstName',
            'email' => 'owner.store@demo.bj',
            'phone_number' => '+22990000111',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'school' => [
                'name' => 'Stored School',
                'latitude' => 6.37,
                'longitude' => 2.43,
                'authorization' => 'AUTH-STORE-2026',
                'creation_date' => '2020-09-01',
            ],
        ]);

        $schoolId = $response->assertCreated()
            ->assertJsonPath('data.school.name', 'Stored School')
            ->json('data.school.id');

        $this->assertDatabaseHas('users', [
            'email' => 'owner.store@demo.bj',
            'school_id' => $schoolId,
        ]);
    }

    #[Test]
    public function can_subscribe_school_to_exam_and_register_student_with_candidate_and_reused_user(): void
    {
        $creator = $this->authenticate();

        $examId = $this->postJson('/api/exams', [
            'title' => 'BEPC 2027',
            'start_date' => now()->addDays(10)->toDateTimeString(),
            'end_date' => now()->addDays(11)->toDateTimeString(),
        ])->assertCreated()->json('data.id');

        $school = School::factory()->create();

        $speciality = Speciality::factory()->create();
        $this->putJson("/api/exams/{$examId}/specialities/sync", [
            'speciality_ids' => [$speciality->id],
        ])->assertOk();

        $examSchoolId = $this->postJson('/api/exam-schools', [
            'exam_id' => $examId,
            'school_id' => $school->id,
        ])->assertCreated()->json('data.id');

        $existingUser = User::factory()->create([
            'email' => 'student.one@demo.bj',
            'school_id' => null,
        ]);

        $studentResponse = $this->postJson('/api/students', [
            'exam_school_id' => $examSchoolId,
            'speciality_id' => $speciality->id,
            'user' => [
                'name' => 'Doe',
                'firstname' => 'Student',
                'email' => 'student.one@demo.bj',
                'phone_number' => '+22995550000',
            ],
            'student' => [
                'code' => 'STD-0001',
                'guardian_name' => 'Parent',
                'guardian_surname' => 'One',
                'guardian_phone' => '+22996660000',
            ],
        ]);

        $studentId = $studentResponse->assertCreated()
            ->assertJsonPath('meta.user_reused', true)
            ->json('data.id');

        $this->assertDatabaseHas('students', [
            'id' => $studentId,
            'exam_school_id' => $examSchoolId,
            'user_id' => $existingUser->id,
        ]);

        $this->assertDatabaseHas('candidates', [
            'student_id' => $studentId,
            'speciality_id' => $speciality->id,
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $existingUser->id,
            'school_id' => $school->id,
        ]);

        $this->assertDatabaseCount('users', 2);

        $this->assertDatabaseHas('exam_schools', [
            'id' => $examSchoolId,
            'subscriptor_id' => $creator->id,
        ]);
    }

    #[Test]
    public function can_import_students_from_csv_using_same_creation_logic(): void
    {
        $this->authenticate();

        $examId = $this->postJson('/api/exams', [
            'title' => 'CEP 2027',
            'start_date' => now()->addDays(12)->toDateTimeString(),
            'end_date' => now()->addDays(13)->toDateTimeString(),
        ])->assertCreated()->json('data.id');

        $school = School::factory()->create();
        $speciality = Speciality::factory()->create();

        $this->putJson("/api/exams/{$examId}/specialities/sync", [
            'speciality_ids' => [$speciality->id],
        ])->assertOk();

        $examSchoolId = $this->postJson('/api/exam-schools', [
            'exam_id' => $examId,
            'school_id' => $school->id,
        ])->assertCreated()->json('data.id');

        User::factory()->create([
            'email' => 'existing.import@demo.bj',
            'school_id' => null,
        ]);

        $csv = implode("\n", [
            'name,firstname,email,phone_number,code,guardian_name,guardian_surname,guardian_phone',
            'Doe,Alpha,existing.import@demo.bj,+22990000001,STD-1001,Parent,Alpha,+22995550001',
            'Doe,Beta,new.import@demo.bj,+22990000002,STD-1002,Parent,Beta,+22995550002',
        ]);

        $file = UploadedFile::fake()->createWithContent('students.csv', $csv);

        $response = $this->postJson('/api/students/import', [
            'exam_school_id' => $examSchoolId,
            'speciality_id' => $speciality->id,
            'file' => $file,
        ]);

        $response->assertOk()
            ->assertJsonPath('data.total_rows', 2)
            ->assertJsonPath('data.created_students', 2)
            ->assertJsonPath('data.reused_users', 1)
            ->assertJsonPath('data.errors.0', null);

        $this->assertDatabaseCount('students', 2);
        $this->assertDatabaseCount('candidates', 2);
        $this->assertDatabaseHas('users', ['email' => 'new.import@demo.bj']);
    }
}
