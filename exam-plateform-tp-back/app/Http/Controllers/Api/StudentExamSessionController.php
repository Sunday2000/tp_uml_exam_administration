<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StudentExamSessionResource;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StudentExamSessionController extends Controller
{
    /**
     * GET /api/user/exam-sessions
     *
     * Returns every exam session the authenticated user participates in,
     * one entry per Candidate record linked to one of the user's Students.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        // Load all candidates belonging to this user through their students.
        $candidates = Candidate::query()
            ->whereHas('student', fn ($q) => $q->where('user_id', $user->id))
            ->with([
                'speciality.grade',
                'speciality.serie',
                'testCenter',
                'student.examSchool.exam',
                'student.examSchool.school',
            ])
            ->get();

        return StudentExamSessionResource::collection($candidates);
    }
}
