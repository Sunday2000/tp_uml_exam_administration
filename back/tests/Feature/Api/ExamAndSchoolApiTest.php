<?php

namespace Tests\Feature\Api;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\Grade;
use App\Models\School;
use App\Models\Serie;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\TestCenter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ExamAndSchoolApiTest extends TestCase
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
    public function school_crud_and_subscription_validation_work(): void
    {
        $this->authenticate();

        $store = $this->postJson('/api/schools', [
            'name' => 'Owner',
            'firstname' => 'School',
            'email' => 'school-api-test@demo.bj',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'school' => [
                'name' => 'My School',
                'authorization' => 'AUTH-01',
                'creation_date' => '2020-01-01',
            ],
        ]);

        $schoolId = $store->assertCreated()
            ->assertJsonPath('data.school.status', null)
            ->json('data.school.id');

        $this->postJson("/api/schools/{$schoolId}/subscription-status", [
            'status' => true,
        ])
            ->assertOk()
            ->assertJsonPath('data.status', true);

        $this->postJson("/api/schools/{$schoolId}/subscription-status", [
            'status' => false,
        ])
            ->assertOk()
            ->assertJsonPath('data.status', false);
    }

    #[Test]
    public function school_delete_is_soft_when_user_relation_exists_and_force_when_no_relation(): void
    {
        $this->authenticate();

        $withRelation = School::factory()->create();
        User::factory()->create(['school_id' => $withRelation->id]);

        $withoutRelation = School::factory()->create();

        $this->deleteJson('/api/schools/' . $withRelation->id)->assertNoContent();
        $this->assertSoftDeleted('schools', ['id' => $withRelation->id]);

        $this->deleteJson('/api/schools/' . $withoutRelation->id)->assertNoContent();
        $this->assertDatabaseMissing('schools', ['id' => $withoutRelation->id]);
    }

    #[Test]
    public function school_show_returns_totals_and_exam_session_candidate_counts(): void
    {
        $creator = $this->authenticate();

        $school = School::factory()->create();
        $examA = Exam::factory()->create();
        $examB = Exam::factory()->create();

        $examSchoolA = ExamSchool::factory()->create([
            'exam_id' => $examA->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $examSchoolB = ExamSchool::factory()->create([
            'exam_id' => $examB->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        Student::factory()->count(2)->create(['exam_school_id' => $examSchoolA->id]);
        Student::factory()->count(1)->create(['exam_school_id' => $examSchoolB->id]);

        $response = $this->getJson('/api/schools/' . $school->id)
            ->assertOk()
            ->assertJsonPath('data.total_candidates', 3)
            ->assertJsonPath('data.total_exam_sessions_subscribed', 2);

        $sessions = collect($response->json('data.exam_sessions'));

        $this->assertCount(2, $sessions);
        $this->assertSame(2, $sessions->firstWhere('exam_school_id', $examSchoolA->id)['presented_candidates_count']);
        $this->assertSame(1, $sessions->firstWhere('exam_school_id', $examSchoolB->id)['presented_candidates_count']);
    }

    #[Test]
    public function exam_status_and_sync_endpoints_work_as_expected(): void
    {
        $creator = $this->authenticate();

        $examId = $this->postJson('/api/exams', [
            'title' => 'BEPC 2026',
            'start_date' => now()->addDays(5)->toDateTimeString(),
            'end_date' => now()->addDays(6)->toDateTimeString(),
            'registration_deadline' => now()->addDays(2)->toDateString(),
        ])->assertCreated()
            ->assertJsonPath('data.user_id', $creator->id)
            ->assertJsonPath('data.status', 'pending')
            ->json('data.id');

        $testCenter1 = TestCenter::factory()->create();
        $testCenter2 = TestCenter::factory()->create();
        $grade = Grade::factory()->create();
        $serie = Serie::factory()->create();
        $speciality = Speciality::create(['grade_id' => $grade->id, 'serie_id' => $serie->id]);

        $this->postJson("/api/exams/{$examId}/status", ['status' => 'ongoing'])
            ->assertOk()
            ->assertJsonPath('data.status', 'ongoing');

        $this->putJson("/api/exams/{$examId}/test-centers/sync", [
            'test_center_ids' => [$testCenter1->id, $testCenter2->id],
        ])->assertOk();

        $this->putJson("/api/exams/{$examId}/specialities/sync", [
            'speciality_ids' => [$speciality->id],
        ])->assertOk();

        $this->assertDatabaseCount('exam_test_centers', 2);
        $this->assertDatabaseHas('exam_specialities', [
            'exam_id' => $examId,
            'speciality_id' => $speciality->id,
        ]);
    }

    #[Test]
    public function exam_and_test_center_delete_follow_conditional_soft_delete_rule(): void
    {
        $this->authenticate();

        $exam = Exam::factory()->create();
        $testCenter = TestCenter::factory()->create();

        $this->putJson('/api/exams/' . $exam->id . '/test-centers/sync', [
            'test_center_ids' => [$testCenter->id],
        ])->assertOk();

        $this->deleteJson('/api/exams/' . $exam->id)->assertNoContent();
        $this->assertSoftDeleted('exams', ['id' => $exam->id]);

        $this->deleteJson('/api/test-centers/' . $testCenter->id)->assertNoContent();
        $this->assertSoftDeleted('test_centers', ['id' => $testCenter->id]);

        $freeExam = Exam::factory()->create();
        $freeCenter = TestCenter::factory()->create();

        $this->deleteJson('/api/exams/' . $freeExam->id)->assertNoContent();
        $this->assertDatabaseMissing('exams', ['id' => $freeExam->id]);

        $this->deleteJson('/api/test-centers/' . $freeCenter->id)->assertNoContent();
        $this->assertDatabaseMissing('test_centers', ['id' => $freeCenter->id]);
    }

    #[Test]
    public function sync_endpoints_soft_delete_links_when_candidates_still_reference_exam_data(): void
    {
        $creator = $this->authenticate();

        $exam = Exam::factory()->create(['user_id' => $creator->id]);
        $school = School::factory()->create();
        $keptSpeciality = Speciality::factory()->create();
        $removedSpeciality = Speciality::factory()->create();
        $keptCenter = TestCenter::factory()->create();
        $removedCenter = TestCenter::factory()->create();

        $this->putJson('/api/exams/' . $exam->id . '/specialities/sync', [
            'speciality_ids' => [$keptSpeciality->id, $removedSpeciality->id],
        ])->assertOk();

        $this->putJson('/api/exams/' . $exam->id . '/test-centers/sync', [
            'test_center_ids' => [$keptCenter->id, $removedCenter->id],
        ])->assertOk();

        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $student = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);

        Candidate::factory()->create([
            'student_id' => $student->id,
            'speciality_id' => $removedSpeciality->id,
            'test_center_id' => $removedCenter->id,
        ]);

        $this->putJson('/api/exams/' . $exam->id . '/specialities/sync', [
            'speciality_ids' => [$keptSpeciality->id],
        ])->assertOk();

        $this->putJson('/api/exams/' . $exam->id . '/test-centers/sync', [
            'test_center_ids' => [$keptCenter->id],
        ])->assertOk();

        $this->assertSoftDeleted('exam_specialities', [
            'exam_id' => $exam->id,
            'speciality_id' => $removedSpeciality->id,
        ]);

        $this->assertSoftDeleted('exam_test_centers', [
            'exam_id' => $exam->id,
            'test_center_id' => $removedCenter->id,
        ]);
    }
}
