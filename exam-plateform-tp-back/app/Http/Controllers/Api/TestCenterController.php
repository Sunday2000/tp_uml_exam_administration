<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestCenterResource;
use App\Models\TestCenter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class TestCenterController extends Controller
{
    public function index()
    {
        return TestCenterResource::collection(TestCenter::query()->orderBy('title')->get());
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:test_centers,code'],
            'longitude' => ['nullable', 'numeric'],
            'latitude' => ['nullable', 'numeric'],
            'location_indication' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'seating_capacity' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $testCenter = TestCenter::create($validated);

        return (new TestCenterResource($testCenter))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(TestCenter $testCenter): TestCenterResource
    {
        return new TestCenterResource($testCenter);
    }

    public function update(Request $request, TestCenter $testCenter): TestCenterResource
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'code' => ['sometimes', 'required', 'string', 'max:255', Rule::unique('test_centers', 'code')->ignore($testCenter->id)],
            'longitude' => ['nullable', 'numeric'],
            'latitude' => ['nullable', 'numeric'],
            'location_indication' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'seating_capacity' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $testCenter->update($validated);

        return new TestCenterResource($testCenter->fresh());
    }

    public function destroy(TestCenter $testCenter): Response
    {
        if ($testCenter->hasChildren()) {
            $testCenter->delete();
        } else {
            $testCenter->forceDelete();
        }

        return response()->noContent();
    }
}
