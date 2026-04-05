<?php

namespace Tests\Feature\Api;

use App\Models\Candidate;
use App\Models\Exam;
use App\Models\ExamSchool;
use App\Models\ExamSpeciality;
use App\Models\ExamTestCenter;
use App\Models\School;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\TestCenter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use PHPUnit\Framework\Attributes\Test;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class CandidateAssignmentApiTest extends TestCase
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
    public function manual_assignment_enforces_center_capacity_and_exam_school_table_number_uniqueness(): void
    {
        $creator = $this->authenticate();

        $exam = Exam::factory()->create();
        $school = School::factory()->create();
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $speciality = Speciality::factory()->create();
        ExamSpeciality::factory()->create([
            'exam_id' => $exam->id,
            'speciality_id' => $speciality->id,
            'subscriptor_id' => $creator->id,
        ]);

        $centerA = TestCenter::factory()->create(['seating_capacity' => 1]);
        $centerB = TestCenter::factory()->create(['seating_capacity' => 10]);

        ExamTestCenter::factory()->create([
            'exam_id' => $exam->id,
            'test_center_id' => $centerA->id,
            'subscriptor_id' => $creator->id,
        ]);
        ExamTestCenter::factory()->create([
            'exam_id' => $exam->id,
            'test_center_id' => $centerB->id,
            'subscriptor_id' => $creator->id,
        ]);

        $studentOne = Student::factory()->create(['exam_school_id' => $examSchool->id]);
        $studentTwo = Student::factory()->create(['exam_school_id' => $examSchool->id]);

        $candidateOne = Candidate::factory()->create([
            'student_id' => $studentOne->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => null,
            'table_number' => null,
        ]);

        $candidateTwo = Candidate::factory()->create([
            'student_id' => $studentTwo->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => null,
            'table_number' => null,
        ]);

        $assignOne = $this->postJson('/api/candidates/assign-test-center', [
            'exam_school_id' => $examSchool->id,
            'test_center_id' => $centerA->id,
            'candidate_id' => $candidateOne->id,
        ]);

        $assignOne->assertOk()
            ->assertJsonPath('data.candidate_id', $candidateOne->id)
            ->assertJsonPath('data.test_center_id', $centerA->id);
        
        $tableNumberOne = $assignOne->json('data.table_number');
        $this->assertStringStartsWith($centerA->code, $tableNumberOne, 'Table number should start with test center code');

        $this->assertDatabaseHas('candidates', [
            'id' => $candidateOne->id,
            'test_center_id' => $centerA->id,
            'table_number' => $tableNumberOne,
        ]);

        $capacityError = $this->postJson('/api/candidates/assign-test-center', [
            'exam_school_id' => $examSchool->id,
            'test_center_id' => $centerA->id,
            'candidate_id' => $candidateTwo->id,
        ]);

        $capacityError->assertUnprocessable()
            ->assertJsonPath('message', 'Test center capacity exceeded for this exam.');

        $assignTwo = $this->postJson('/api/candidates/assign-test-center', [
            'exam_school_id' => $examSchool->id,
            'test_center_id' => $centerB->id,
            'candidate_id' => $candidateTwo->id,
        ]);

        $assignTwo->assertOk();
        
        $tableNumberTwo = $assignTwo->json('data.table_number');
        $this->assertStringStartsWith($centerB->code, $tableNumberTwo, 'Table number should start with test center code');
        $this->assertNotEquals($tableNumberOne, $tableNumberTwo, 'Different test centers should have different table numbers');

        $this->assertDatabaseHas('candidates', [
            'id' => $candidateTwo->id,
            'test_center_id' => $centerB->id,
            'table_number' => $tableNumberTwo,
        ]);
    }

    #[Test]
    public function auto_assignment_assigns_unassigned_candidates_for_given_exam_only(): void
    {
        $creator = $this->authenticate();

        $exam = Exam::factory()->create();
        $otherExam = Exam::factory()->create();

        $school = School::factory()->create();
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $otherExamSchool = ExamSchool::factory()->create([
            'exam_id' => $otherExam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $speciality = Speciality::factory()->create();
        ExamSpeciality::factory()->create([
            'exam_id' => $exam->id,
            'speciality_id' => $speciality->id,
            'subscriptor_id' => $creator->id,
        ]);

        $centerA = TestCenter::factory()->create(['seating_capacity' => 2]);
        $centerB = TestCenter::factory()->create(['seating_capacity' => 2]);

        ExamTestCenter::factory()->create([
            'exam_id' => $exam->id,
            'test_center_id' => $centerA->id,
            'subscriptor_id' => $creator->id,
        ]);
        ExamTestCenter::factory()->create([
            'exam_id' => $exam->id,
            'test_center_id' => $centerB->id,
            'subscriptor_id' => $creator->id,
        ]);

        $students = Student::factory()->count(3)->create(['exam_school_id' => $examSchool->id]);

        foreach ($students as $student) {
            Candidate::factory()->create([
                'student_id' => $student->id,
                'speciality_id' => $speciality->id,
                'test_center_id' => null,
                'table_number' => null,
            ]);
        }

        $otherStudent = Student::factory()->create(['exam_school_id' => $otherExamSchool->id]);
        $otherCandidate = Candidate::factory()->create([
            'student_id' => $otherStudent->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => null,
            'table_number' => null,
        ]);

        $response = $this->postJson('/api/candidates/auto-assign-test-centers', [
            'exam_id' => $exam->id,
        ]);

        $response->assertOk()
            ->assertJsonPath('data.assigned', 3)
            ->assertJsonPath('data.not_assigned', 0);

        $this->assertDatabaseCount('candidates', 4);

        $assignedForExam = Candidate::query()
            ->whereHas('student', function ($query) use ($examSchool): void {
                $query->where('exam_school_id', $examSchool->id);
            })
            ->get();

        foreach ($assignedForExam as $candidate) {
            $this->assertNotNull($candidate->test_center_id);
            $this->assertNotNull($candidate->table_number);
        }

        $this->assertDatabaseHas('candidates', [
            'id' => $otherCandidate->id,
            'test_center_id' => null,
            'table_number' => null,
        ]);
    }

    #[Test]
    public function attendance_list_contains_exam_center_candidates_and_signing_rows(): void
    {
        $creator = $this->authenticate();

        $exam = Exam::factory()->create(['title' => 'BEPC 2030']);
        $school = School::factory()->create(['name' => 'Lycee Moderne']);
        $schoolTwo = School::factory()->create(['name' => 'College Central']);

        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $examSchoolTwo = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $schoolTwo->id,
            'subscriptor_id' => $creator->id,
        ]);

        $testCenter = TestCenter::factory()->create(['title' => 'Centre A']);

        ExamTestCenter::factory()->create([
            'exam_id' => $exam->id,
            'test_center_id' => $testCenter->id,
            'subscriptor_id' => $creator->id,
        ]);

        $speciality = Speciality::factory()->create();

        $studentOne = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);
        $studentOne->user()->update([
            'name' => 'Doe',
            'firstname' => 'Anna',
        ]);

        $studentTwo = Student::factory()->create([
            'exam_school_id' => $examSchool->id,
        ]);
        $studentTwo->user()->update([
            'name' => 'Smith',
            'firstname' => 'Ben',
        ]);

        Candidate::factory()->create([
            'student_id' => $studentOne->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
            'table_number' => '1',
            'matricule' => 'MAT-2030-AAAA0001',
        ]);

        Candidate::factory()->create([
            'student_id' => $studentTwo->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
            'table_number' => '2',
            'matricule' => 'MAT-2030-BBBB0002',
        ]);

        $studentThree = Student::factory()->create([
            'exam_school_id' => $examSchoolTwo->id,
        ]);
        $studentThree->user()->update([
            'name' => 'Walker',
            'firstname' => 'Cara',
        ]);

        Candidate::factory()->create([
            'student_id' => $studentThree->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
            'table_number' => '3',
            'matricule' => 'MAT-2030-CCCC0003',
        ]);

        $response = $this->get('/api/candidates/attendance-list?' . http_build_query([
            'exam_id' => $exam->id,
            'test_center_id' => $testCenter->id,
        ]));

        $response->assertOk();
        $this->assertStringContainsString('application/pdf', (string) $response->headers->get('content-type'));
        $pdfBody = (string) $response->getContent();
        $this->assertStringStartsWith('%PDF', $pdfBody);
    }

    #[Test]
    public function invitation_download_generates_pdf_from_candidate_id(): void
    {
        $creator = $this->authenticate();

        $exam = Exam::factory()->create(['title' => 'Baccalaureat General 2026']);
        $school = School::factory()->create(['name' => 'Lycee Moderne']);
        $examSchool = ExamSchool::factory()->create([
            'exam_id' => $exam->id,
            'school_id' => $school->id,
            'subscriptor_id' => $creator->id,
        ]);

        $speciality = Speciality::factory()->create();
        $testCenter = TestCenter::factory()->create([
            'title' => 'Centre Principal',
            'code' => 'CP-01',
        ]);

        $student = Student::factory()->create(['exam_school_id' => $examSchool->id]);
        $student->user()->update([
            'name' => 'Kouassi',
            'firstname' => 'Jean-Baptiste',
        ]);

        $candidate = Candidate::factory()->create([
            'student_id' => $student->id,
            'speciality_id' => $speciality->id,
            'test_center_id' => $testCenter->id,
            'table_number' => 'CP-011',
            'matricule' => 'MAT-2026-ABC12345',
        ]);

        $response = $this->get('/api/candidates/invitation?' . http_build_query([
            'candidate_id' => $candidate->id,
        ]));

        $response->assertOk();
        $this->assertStringContainsString('application/pdf', (string) $response->headers->get('content-type'));
        $this->assertStringContainsString('attachment; filename="convocation-MAT-2026-ABC12345.pdf"', (string) $response->headers->get('content-disposition'));
        $pdfBody = (string) $response->getContent();
        $this->assertStringStartsWith('%PDF', $pdfBody);
    }
 }
