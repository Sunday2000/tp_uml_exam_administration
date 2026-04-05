<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateAssignmentController;
use App\Http\Controllers\Api\OtpController;
use App\Http\Controllers\Api\CandidateSubjectController;
use App\Http\Controllers\Api\ExamController;
use App\Http\Controllers\Api\ExamSchoolController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\SerieController;
use App\Http\Controllers\Api\SpecialityController;
use App\Http\Controllers\Api\SpecialitySubjectController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\StudentExamSessionController;
use App\Http\Controllers\Api\SubjectController;
use App\Http\Controllers\Api\TestCenterController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->name('auth.')->group(function () {
    // Routes publiques
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('verify-otp', [AuthController::class, 'verifyOtp'])->name('verify-otp');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password');
    Route::post('register-school', [AuthController::class, 'registerSchool'])->name('register-school');
    Route::get('otp', [OtpController::class, 'show'])->name('otp');

    // Routes protégées par Passport
    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('me', [AuthController::class, 'me'])->name('me');
    });
});

Route::middleware('auth:api')->group(function () {
    Route::apiResource('grades', GradeController::class);
    Route::apiResource('series', SerieController::class)->parameters([
        'series' => 'serie',
    ]);
    Route::apiResource('specialities', SpecialityController::class);
    Route::apiResource('subjects', SubjectController::class);
    Route::post('speciality-subjects', [SpecialitySubjectController::class, 'store']);
    Route::apiResource('schools', SchoolController::class);
    Route::post('schools/{school}/subscription-status', [SchoolController::class, 'updateSubscriptionStatus']);
    Route::apiResource('test-centers', TestCenterController::class)->parameters([
        'test-centers' => 'testCenter',
    ]);
    Route::apiResource('exams', ExamController::class);
    Route::post('exams/{exam}/status', [ExamController::class, 'changeStatus']);
    Route::put('exams/{exam}/test-centers/sync', [ExamController::class, 'syncTestCenters']);
    Route::put('exams/{exam}/specialities/sync', [ExamController::class, 'syncSpecialities']);
    Route::get('exams/{exam}/candidates', [ExamController::class, 'candidates']);
    Route::get('exams/{exam}/deliberation-board', [ExamController::class, 'deliberationBoard']);
    Route::apiResource('exam-schools', ExamSchoolController::class)
        ->parameters(['exam-schools' => 'examSchool'])
        ->only(['index', 'store', 'show', 'destroy']);
    Route::apiResource('students', StudentController::class)
        ->only(['index', 'store', 'show']);
    Route::post('students/import', [StudentController::class, 'import']);
    Route::apiResource('users', UserController::class);
    Route::get('roles', [RoleController::class, 'index']);
    Route::get('files/download', [FileController::class, 'download'])->name('files.download');

    Route::post('candidates/assign-test-center', [CandidateAssignmentController::class, 'assignTestCenter']);
    Route::post('candidates/auto-assign-test-centers', [CandidateAssignmentController::class, 'autoAssignByExam']);
    Route::get('candidates/attendance-list', [CandidateAssignmentController::class, 'attendanceListByCenter']);
    Route::get('candidates/invitation', [CandidateAssignmentController::class, 'downloadInvitation']);
    Route::post('candidates/deliberations', [ExamController::class, 'storeDeliberations']);
    Route::post('candidates/transcript', [ExamController::class, 'candidateTranscript']);

    Route::post('candidate-subjects/grade-overview', [CandidateSubjectController::class, 'gradeOverview']);
    Route::post('candidate-subjects/save-grades', [CandidateSubjectController::class, 'saveGrades']);

    Route::get('user/exam-sessions', [StudentExamSessionController::class, 'index']);
});
