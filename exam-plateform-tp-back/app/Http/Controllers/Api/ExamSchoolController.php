<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ExamSchool\StoreExamSchoolRequest;
use App\Http\Resources\ExamSchoolResource;
use App\Models\ExamSchool;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class ExamSchoolController extends Controller
{
    public function index(Request $request)
    {
        $query = ExamSchool::query()
            ->with(['exam','exam.specialities:id,code,serie_id,grade_id', 'school'])
            ->withCount('students')
            ->orderByDesc('id');

        if ($request->filled('exam_id')) {
            $query->where('exam_id', (int) $request->input('exam_id'));
        }

        if ($request->filled('school_id')) {
            $query->where('school_id', (int) $request->input('school_id'));
        }

        return ExamSchoolResource::collection($query->get());
    }

    public function store(StoreExamSchoolRequest $request): Response
    {
        $validated = $request->validated();

        $examSchool = DB::transaction(function () use ($validated, $request) {
            $existing = ExamSchool::withTrashed()
                ->where('exam_id', $validated['exam_id'])
                ->where('school_id', $validated['school_id'])
                ->first();

            if ($existing) {
                if ($existing->trashed()) {
                    $existing->restore();
                }

                $existing->update([
                    'subscription_date' => $validated['subscription_date'] ?? now(),
                    'subscriptor_id' => $request->user()->id,
                ]);

                return $existing->fresh();
            }

            return ExamSchool::create([
                'exam_id' => $validated['exam_id'],
                'school_id' => $validated['school_id'],
                'subscription_date' => $validated['subscription_date'] ?? now(),
                'subscriptor_id' => $request->user()->id,
            ]);
        });

        return (new ExamSchoolResource($examSchool->load(['exam', 'school'])->loadCount('students')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(ExamSchool $examSchool): ExamSchoolResource
    {
        return new ExamSchoolResource($examSchool->load(['exam', 'school'])->loadCount('students'));
    }

    public function destroy(ExamSchool $examSchool): Response
    {
        if ($examSchool->hasChildren()) {
            $examSchool->delete();
        } else {
            $examSchool->forceDelete();
        }

        return response()->noContent();
    }
}
