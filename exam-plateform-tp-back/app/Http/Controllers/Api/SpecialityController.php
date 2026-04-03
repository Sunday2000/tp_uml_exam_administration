<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpecialityResource;
use App\Models\Speciality;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Validation\Rule;

class SpecialityController extends Controller
{
    public function index()
    {
        $specialities = Speciality::with(['grade', 'serie'])->orderBy('code')->get();

        return SpecialityResource::collection($specialities);
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'grade_id' => ['required', 'integer', 'exists:grades,id'],
            'serie_id' => ['required', 'integer', 'exists:series,id'],
        ]);

        $request->validate([
            'grade_id' => [
                Rule::unique('specialities')->where(fn ($query) => $query
                    ->where('serie_id', $validated['serie_id'])
                    ->whereNull('deleted_at')),
            ],
        ], [
            'grade_id.unique' => 'Cette association grade-serie existe deja.',
        ]);

        $speciality = Speciality::upsertPair($validated['grade_id'], $validated['serie_id']);

        return (new SpecialityResource($speciality->load(['grade', 'serie'])))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(Speciality $speciality): SpecialityResource
    {
        return new SpecialityResource($speciality->load(['grade', 'serie']));
    }

    public function update(Request $request, Speciality $speciality): SpecialityResource
    {
        $validated = $request->validate([
            'grade_id' => ['sometimes', 'required', 'integer', 'exists:grades,id'],
            'serie_id' => ['sometimes', 'required', 'integer', 'exists:series,id'],
        ]);

        $gradeId = $validated['grade_id'] ?? $speciality->grade_id;
        $serieId = $validated['serie_id'] ?? $speciality->serie_id;

        $request->validate([
            'grade_id' => [
                Rule::unique('specialities')->ignore($speciality->id)->where(fn ($query) => $query
                    ->where('grade_id', $gradeId)
                    ->where('serie_id', $serieId)
                    ->whereNull('deleted_at')),
            ],
        ], [
            'grade_id.unique' => 'Cette association grade-serie existe deja.',
        ]);

        $speciality->update($validated);

        return new SpecialityResource($speciality->fresh()->load(['grade', 'serie']));
    }

    public function destroy(Speciality $speciality): Response
    {
        if ($speciality->hasChildren()) {
            $speciality->delete();
        } else {
            $speciality->forceDelete();
        }

        return response()->noContent();
    }
}