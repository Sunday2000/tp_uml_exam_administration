<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SerieResource;
use App\Models\Serie;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SerieController extends Controller
{
    public function index()
    {
        $series = Serie::with('specialities.grade')->orderBy('label')->get();

        return SerieResource::collection($series);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'grade_ids' => ['sometimes', 'array'],
            'grade_ids.*' => ['integer', 'exists:grades,id'],
        ]);

        $serie = DB::transaction(function () use ($validated) {
            $serie = Serie::create([
                'label' => $validated['label'],
                'description' => $validated['description'] ?? null,
            ]);

            if (array_key_exists('grade_ids', $validated)) {
                $serie->syncGrades($validated['grade_ids']);
            }

            return $serie;
        });

        return (new SerieResource($serie->load(['specialities.grade', 'grades'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Serie $serie): SerieResource
    {
        $serie->load('specialities.grade', 'grades');

        return new SerieResource($serie);
    }

    public function update(Request $request, Serie $serie): SerieResource
    {
        $validated = $request->validate([
            'label' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'grade_ids' => ['sometimes', 'array'],
            'grade_ids.*' => ['integer', 'exists:grades,id'],
        ]);

        DB::transaction(function () use ($serie, $validated) {
            $serie->update(collect($validated)->except(['grade_ids'])->toArray());

            if (array_key_exists('grade_ids', $validated)) {
                $serie->syncGrades($validated['grade_ids']);
            }
        });

        return new SerieResource($serie->fresh()->load(['specialities.grade', 'grades']));
    }

    public function destroy(Serie $serie): Response
    {
        if ($serie->hasChildren()) {
            $serie->delete();
        } else {
            $serie->forceDelete();
        }

        return response()->noContent();
    }
}