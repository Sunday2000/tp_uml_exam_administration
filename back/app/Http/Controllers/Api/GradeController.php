<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GradeResource;
use App\Models\Grade;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;

class GradeController extends Controller
{
    public function index()
    {
        $grades = Grade::with('specialities.serie')->orderBy('label')->get();

        return GradeResource::collection($grades);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:grades,code'],
            'description' => ['nullable', 'string'],
            'serie_ids' => ['sometimes', 'array'],
            'serie_ids.*' => ['integer', 'exists:series,id'],
        ]);

        $grade = DB::transaction(function () use ($validated) {
            $grade = Grade::create([
                'label' => $validated['label'],
                'code' => $validated['code'],
                'description' => $validated['description'] ?? null,
            ]);

            if (array_key_exists('serie_ids', $validated)) {
                $grade->syncSeries($validated['serie_ids']);
            }

            return $grade;
        });

        return (new GradeResource($grade->load(['specialities.serie', 'series'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Grade $grade): GradeResource
    {
        $grade->load('specialities.serie', 'series');

        return new GradeResource($grade);
    }

    public function update(Request $request, Grade $grade): GradeResource
    {
        $validated = $request->validate([
            'label' => ['sometimes', 'required', 'string', 'max:255'],
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('grades', 'code')->ignore($grade->id)],
            'description' => ['nullable', 'string'],
            'serie_ids' => ['sometimes', 'array'],
            'serie_ids.*' => ['integer', 'exists:series,id'],
        ]);

        DB::transaction(function () use ($grade, $validated) {
            $grade->update(collect($validated)->except(['serie_ids'])->toArray());

            if (array_key_exists('serie_ids', $validated)) {
                $grade->syncSeries($validated['serie_ids']);
            }
        });

        return new GradeResource($grade->fresh()->load(['specialities.serie', 'series']));
    }

    public function destroy(Grade $grade): Response
    {
        if ($grade->hasChildren()) {
            $grade->delete();
        } else {
            $grade->forceDelete();
        }

        return response()->noContent();
    }
}