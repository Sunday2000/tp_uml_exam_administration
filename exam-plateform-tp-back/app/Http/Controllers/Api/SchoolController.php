<?php

namespace App\Http\Controllers\Api;

use App\Events\SchoolSubscriptionAccepted;
use App\Http\Controllers\Controller;
use App\Http\Requests\School\StoreSchoolWithOwnerRequest;
use App\Http\Requests\School\UpdateSchoolStatusRequest;
use App\Http\Resources\SchoolResource;
use App\Models\School;
use App\Services\SchoolCreationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SchoolController extends Controller
{
    public function __construct(private readonly SchoolCreationService $schoolCreationService)
    {
    }

    public function index()
    {
        return SchoolResource::collection(
            School::query()
                ->with(['responsible:id,school_id,name,firstname,email,phone_number'])
                ->orderBy('name')
                ->get()
        );
    }

    public function store(StoreSchoolWithOwnerRequest $request): JsonResponse
    {
        $user = $this->schoolCreationService->createSchoolWithOwner($request->validated());

        return response()->json([
            'message' => 'Ecole et proprietaire crees avec succes.',
            'data' => [
                'user_id' => $user->id,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'school' => (new SchoolResource($user->school))->resolve(),
            ],
        ], Response::HTTP_CREATED);
    }

    public function show(School $school): SchoolResource
    {
        $school->load([
            'examSchools' => static function ($query): void {
                $query->with(['exam:id,title,start_date,end_date,status'])
                    ->withCount('students')
                    ->orderByDesc('subscription_date');
            },
        ])->loadCount(['examSchools', 'ongoingExamSchools', 'studentsViaExams']);

        return new SchoolResource($school);
    }

    public function update(Request $request, School $school): SchoolResource
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'authorization' => ['sometimes', 'required', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'creation_date' => ['sometimes', 'required', 'date'],
            'status' => ['nullable', 'boolean'],
        ]);

        $oldStatus = $school->status;
        $school->update($validated);
        
        $this->sendMailIfStatusIsValidated($school, $oldStatus, $validated['status']);

        return new SchoolResource($school->fresh());
    }

    public function destroy(School $school): Response
    {
        if ($school->hasChildren()) {
            $school->delete();
        } else {
            $school->forceDelete();
        }

        return response()->noContent();
    }

    public function updateSubscriptionStatus(UpdateSchoolStatusRequest $request, School $school): SchoolResource
    {
        $newStatus = $request->validated('status');
        $oldStatus = $school->status;

        $school->update(['status' => $newStatus]);

        // Send email if status is being set to true (subscription accepted)
        $this->sendMailIfStatusIsValidated($school, $oldStatus, $newStatus);

        return new SchoolResource($school->fresh());
    }

    private function sendMailIfStatusIsValidated(School $school, $oldStatus, $newStatus){
        if ($newStatus && !$oldStatus) {
            $responsible = $school->responsible()->first();
            if ($responsible) {
                SchoolSubscriptionAccepted::dispatch($school, $responsible);
            }
        }
    }
}
