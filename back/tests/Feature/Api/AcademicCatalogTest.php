<?php

namespace Tests\Feature\Api;

use App\Models\Grade;
use App\Models\Serie;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AcademicCatalogTest extends TestCase
{
    use RefreshDatabase;

    private function authenticate(): void
    {
        Passport::actingAs(User::factory()->create());
    }

    #[Test]
    public function unauthenticated_requests_are_rejected(): void
    {
        $this->getJson('/api/grades')->assertUnauthorized();
        $this->getJson('/api/series')->assertUnauthorized();
        $this->getJson('/api/specialities')->assertUnauthorized();
    }

    #[Test]
    public function authenticated_user_can_crud_grades(): void
    {
        $this->authenticate();

        $storeResponse = $this->postJson('/api/grades', [
            'label' => 'Premier Cycle',
            'code' => 'PC',
            'description' => 'Cycle de base',
        ]);

        $gradeId = $storeResponse->assertCreated()->json('data.id');

        $this->getJson('/api/grades')
            ->assertOk()
            ->assertJsonFragment(['code' => 'PC']);

        $this->getJson("/api/grades/{$gradeId}")
            ->assertOk()
            ->assertJsonFragment(['label' => 'Premier Cycle']);

        $this->putJson("/api/grades/{$gradeId}", [
            'label' => 'Second Cycle',
            'code' => 'SC',
        ])->assertOk()->assertJsonFragment(['code' => 'SC']);

        $this->deleteJson("/api/grades/{$gradeId}")->assertNoContent();
        $this->assertDatabaseMissing('grades', ['id' => $gradeId]);
    }

    #[Test]
    public function authenticated_user_can_crud_series(): void
    {
        $this->authenticate();

        $storeResponse = $this->postJson('/api/series', [
            'label' => 'D',
            'description' => 'Serie scientifique',
        ]);

        $serieId = $storeResponse->assertCreated()->json('data.id');

        $this->getJson('/api/series')
            ->assertOk()
            ->assertJsonFragment(['label' => 'D']);

        $this->getJson("/api/series/{$serieId}")
            ->assertOk()
            ->assertJsonFragment(['description' => 'Serie scientifique']);

        $this->putJson("/api/series/{$serieId}", [
            'label' => 'C',
        ])->assertOk()->assertJsonFragment(['label' => 'C']);

        $this->deleteJson("/api/series/{$serieId}")->assertNoContent();
        $this->assertDatabaseMissing('series', ['id' => $serieId]);
    }

    #[Test]
    public function authenticated_user_can_create_and_read_speciality_relationships(): void
    {
        $this->authenticate();

        $grade = Grade::factory()->create(['label' => 'Terminale', 'code' => 'TLE']);
        $serie = Serie::factory()->create(['label' => 'C']);

        $response = $this->postJson('/api/specialities', [
            'grade_id' => $grade->id,
            'serie_id' => $serie->id,
        ]);

        $specialityId = $response->assertCreated()
            ->assertJsonPath('data.grade.id', $grade->id)
            ->assertJsonPath('data.serie.id', $serie->id)
            ->json('data.id');

        $this->getJson("/api/specialities/{$specialityId}")
            ->assertOk()
            ->assertJsonPath('data.code', 'TLE-C');

        $this->getJson("/api/grades/{$grade->id}")
            ->assertOk()
            ->assertJsonFragment(['label' => 'C'])
            ->assertJsonFragment(['code' => 'TLE-C']);

        $this->getJson("/api/series/{$serie->id}")
            ->assertOk()
            ->assertJsonFragment(['label' => 'Terminale'])
            ->assertJsonFragment(['code' => 'TLE-C']);
    }

    #[Test]
    public function speciality_requires_unique_grade_serie_pair(): void
    {
        $this->authenticate();

        $grade = Grade::factory()->create();
        $serie = Serie::factory()->create();

        Speciality::factory()->create([
            'grade_id' => $grade->id,
            'serie_id' => $serie->id,
        ]);

        $this->postJson('/api/specialities', [
            'grade_id' => $grade->id,
            'serie_id' => $serie->id,
        ])->assertStatus(422)
            ->assertJsonValidationErrors(['grade_id']);
    }

    #[Test]
    public function authenticated_user_can_update_and_delete_speciality(): void
    {
        $this->authenticate();

        $speciality = Speciality::factory()->create();
        $newSerie = Serie::factory()->create();
        $expectedCode = strtoupper($speciality->grade->code . '-' . $newSerie->label);

        $this->putJson("/api/specialities/{$speciality->id}", [
            'serie_id' => $newSerie->id,
        ])->assertOk()
            ->assertJsonPath('data.serie.id', $newSerie->id)
            ->assertJsonPath('data.code', $expectedCode);

        $this->deleteJson("/api/specialities/{$speciality->id}")->assertNoContent();
        $this->assertDatabaseMissing('specialities', ['id' => $speciality->id]);
    }
}