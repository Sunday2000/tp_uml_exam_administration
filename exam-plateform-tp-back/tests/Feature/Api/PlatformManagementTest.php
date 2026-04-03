<?php

namespace Tests\Feature\Api;

use App\Models\Grade;
use App\Models\Serie;
use App\Models\Speciality;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PlatformManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        foreach (['Administrateur', 'Correcteur', 'Jury', 'Ecole'] as $roleName) {
            Role::findOrCreate($roleName, 'api');
        }
    }

    private function authenticate(): void
    {
        $createdUser = User::factory()->createOne();
        Passport::actingAs(User::query()->findOrFail($createdUser->id));
    }

    #[Test]
    public function grade_store_associates_only_provided_series(): void
    {
        $this->authenticate();

        $serie1 = Serie::factory()->create();
        $serie2 = Serie::factory()->create();
        $serie3 = Serie::factory()->create();

        $response = $this->postJson('/api/grades', [
            'label' => 'Test Grade',
            'code' => 'TG',
            'serie_ids' => [$serie1->id, $serie2->id],
        ]);

        $gradeId = $response->assertCreated()->json('data.id');

        $this->assertDatabaseHas('specialities', ['grade_id' => $gradeId, 'serie_id' => $serie1->id, 'deleted_at' => null]);
        $this->assertDatabaseHas('specialities', ['grade_id' => $gradeId, 'serie_id' => $serie2->id, 'deleted_at' => null]);
        $this->assertDatabaseMissing('specialities', ['grade_id' => $gradeId, 'serie_id' => $serie3->id]);
    }

    #[Test]
    public function grade_update_dissociation_soft_deletes_speciality_when_it_has_children(): void
    {
        $this->authenticate();

        $grade = Grade::factory()->create(['code' => 'G1']);
        $serieA = Serie::factory()->create(['label' => 'A']);
        $serieB = Serie::factory()->create(['label' => 'B']);
        $serieC = Serie::factory()->create(['label' => 'C']);

        $specialityA = Speciality::create(['grade_id' => $grade->id, 'serie_id' => $serieA->id]);
        $specialityB = Speciality::create(['grade_id' => $grade->id, 'serie_id' => $serieB->id]);

        $subject = Subject::factory()->create();
        $subject->specialities()->attach($specialityA->id, ['coefficient' => 4]);

        $this->putJson("/api/grades/{$grade->id}", [
            'serie_ids' => [$serieB->id, $serieC->id],
        ])->assertOk();

        $this->assertNotNull($specialityA->fresh()->deleted_at);
        $this->assertDatabaseHas('specialities', ['grade_id' => $grade->id, 'serie_id' => $serieB->id, 'deleted_at' => null]);
        $this->assertDatabaseHas('specialities', ['grade_id' => $grade->id, 'serie_id' => $serieC->id, 'deleted_at' => null]);
    }

    #[Test]
    public function subject_store_and_update_sync_specialities_with_coefficients(): void
    {
        $this->authenticate();

        $grade = Grade::factory()->create(['code' => 'TLE']);
        $serieA = Serie::factory()->create(['label' => 'A']);
        $serieD = Serie::factory()->create(['label' => 'D']);

        $store = $this->postJson('/api/subjects', [
            'label' => 'Mathematiques',
            'code' => 'MATH',
            'type' => 'Ecrit',
            'specialities' => [
                [
                    'grade_id' => $grade->id,
                    'serie_id' => $serieA->id,
                    'coefficient' => 5,
                ],
                [
                    'grade_id' => $grade->id,
                    'serie_id' => $serieD->id,
                    'coefficient' => 3,
                ],
            ],
        ]);

        $subjectId = $store->assertCreated()->json('data.id');

        $subject = Subject::findOrFail($subjectId);
        $specialityA = Speciality::where('grade_id', $grade->id)->where('serie_id', $serieA->id)->firstOrFail();
        $specialityD = Speciality::where('grade_id', $grade->id)->where('serie_id', $serieD->id)->firstOrFail();

        $this->assertDatabaseHas('speciality_subjects', [
            'subject_id' => $subject->id,
            'speciality_id' => $specialityA->id,
            'coefficient' => 5,
        ]);
        $this->assertDatabaseHas('speciality_subjects', [
            'subject_id' => $subject->id,
            'speciality_id' => $specialityD->id,
            'coefficient' => 3,
        ]);

        $this->putJson("/api/subjects/{$subject->id}", [
            'specialities' => [
                [
                    'grade_id' => $grade->id,
                    'serie_id' => $serieD->id,
                    'coefficient' => 7,
                ],
            ],
        ])->assertOk();

        $this->assertDatabaseMissing('speciality_subjects', [
            'subject_id' => $subject->id,
            'speciality_id' => $specialityA->id,
        ]);
        $this->assertDatabaseHas('speciality_subjects', [
            'subject_id' => $subject->id,
            'speciality_id' => $specialityD->id,
            'coefficient' => 7,
        ]);
    }

    #[Test]
    public function can_associate_speciality_to_subject_with_required_payload_fields(): void
    {
        $this->authenticate();

        $grade = Grade::factory()->create(['code' => '1ERE']);
        $serie = Serie::factory()->create(['label' => 'C']);
        $subject = Subject::factory()->create();

        $response = $this->postJson('/api/speciality-subjects', [
            'grade_id' => $grade->id,
            'serie_id' => $serie->id,
            'subject_id' => $subject->id,
            'coefficient' => 6,
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.subject_id', $subject->id)
            ->assertJsonPath('data.coefficient', 6);

        $speciality = Speciality::query()
            ->where('grade_id', $grade->id)
            ->where('serie_id', $serie->id)
            ->firstOrFail();

        $this->assertDatabaseHas('speciality_subjects', [
            'speciality_id' => $speciality->id,
            'subject_id' => $subject->id,
            'coefficient' => 6,
        ]);
    }

    #[Test]
    public function roles_list_returns_default_roles(): void
    {
        $this->authenticate();

        $this->getJson('/api/roles')
            ->assertOk()
            ->assertJsonFragment(['name' => 'Administrateur'])
            ->assertJsonFragment(['name' => 'Correcteur'])
            ->assertJsonFragment(['name' => 'Jury'])
            ->assertJsonFragment(['name' => 'Ecole']);
    }

    #[Test]
    public function user_api_cannot_create_ecole_role(): void
    {
        $this->authenticate();

        $this->postJson('/api/users', [
            'name' => 'School',
            'firstname' => 'Owner',
            'email' => 'owner@ecole.bj',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'Ecole',
        ])->assertStatus(422)
            ->assertJsonValidationErrors(['role']);
    }

    #[Test]
    public function school_registration_creates_ecole_user_and_school(): void
    {
        $response = $this->postJson('/api/auth/register-school', [
            'name' => 'Dupont',
            'firstname' => 'Jean',
            'email' => 'ecole@demo.bj',
            'phone_number' => '+22990000000',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'school' => [
                'name' => 'College Demo',
                'latitude' => 6.37,
                'longitude' => 2.43,
                'authorization' => 'AUTH-2026',
                'creation_date' => '2020-09-01',
            ],
        ]);

        $response->assertCreated()
            ->assertJsonFragment(['message' => 'Compte ecole cree avec succes.'])
            ->assertJsonPath('data.roles.0', 'Ecole');

        $this->assertDatabaseHas('schools', ['name' => 'College Demo']);
        $this->assertDatabaseHas('users', ['email' => 'ecole@demo.bj']);
    }

    #[Test]
    public function deleting_grade_soft_deletes_when_relations_exist_otherwise_force_deletes(): void
    {
        $this->authenticate();

        $gradeWithRelation = Grade::factory()->create();
        $gradeWithoutRelation = Grade::factory()->create();
        $serie = Serie::factory()->create();

        Speciality::create([
            'grade_id' => $gradeWithRelation->id,
            'serie_id' => $serie->id,
        ]);

        $this->deleteJson('/api/grades/' . $gradeWithRelation->id)->assertNoContent();
        $this->assertSoftDeleted('grades', ['id' => $gradeWithRelation->id]);

        $this->deleteJson('/api/grades/' . $gradeWithoutRelation->id)->assertNoContent();
        $this->assertDatabaseMissing('grades', ['id' => $gradeWithoutRelation->id]);
    }

    #[Test]
    public function deleting_serie_soft_deletes_when_relations_exist_otherwise_force_deletes(): void
    {
        $this->authenticate();

        $serieWithRelation = Serie::factory()->create();
        $serieWithoutRelation = Serie::factory()->create();
        $grade = Grade::factory()->create();

        Speciality::create([
            'grade_id' => $grade->id,
            'serie_id' => $serieWithRelation->id,
        ]);

        $this->deleteJson('/api/series/' . $serieWithRelation->id)->assertNoContent();
        $this->assertSoftDeleted('series', ['id' => $serieWithRelation->id]);

        $this->deleteJson('/api/series/' . $serieWithoutRelation->id)->assertNoContent();
        $this->assertDatabaseMissing('series', ['id' => $serieWithoutRelation->id]);
    }

    #[Test]
    public function deleting_subject_soft_deletes_when_relations_exist_otherwise_force_deletes(): void
    {
        $this->authenticate();

        $subjectWithRelation = Subject::factory()->create();
        $subjectWithoutRelation = Subject::factory()->create();
        $speciality = Speciality::factory()->create();

        $subjectWithRelation->specialities()->attach($speciality->id, ['coefficient' => 2]);

        $this->deleteJson('/api/subjects/' . $subjectWithRelation->id)->assertNoContent();
        $this->assertSoftDeleted('subjects', ['id' => $subjectWithRelation->id]);

        $this->deleteJson('/api/subjects/' . $subjectWithoutRelation->id)->assertNoContent();
        $this->assertDatabaseMissing('subjects', ['id' => $subjectWithoutRelation->id]);
    }
}
