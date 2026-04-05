<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    private const CREATABLE_ROLES = [
        'Administrateur',
        'Correcteur',
        'Jury',
        "Autorité de régulation",
        "Ecole"
    ];

    public function index(Request $request)
    {
        $query = User::with('school')->orderBy('id');
        $connectedUser = $request->user();

        if ($connectedUser?->isSchool()) 
            $query->where('school_id', $connectedUser->school_id);
        else
            $query->whereDoesntHave('roles', function ($query) {
                $query->whereIn('name', ['Ecole', 'Etudiant']);
            });
        return UserResource::collection($query->get());
    }

    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'firstname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'is_active' => ['sometimes', 'boolean'],
            'role' => ['required', 'string', 'in:' . implode(',', self::CREATABLE_ROLES)],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'firstname' => $validated['firstname'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'] ?? null,
            'password' => $validated['password'],
            'is_active' => $validated['is_active'] ?? true,
            'school_id' => $request->user()?->isSchool() ? $request->user()->school_id : null,
        ]);

        $user->assignRole($validated['role']);

        return (new UserResource($user->load('school')))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function show(User $user): UserResource
    {
        return new UserResource($user->load('school'));
    }

    public function update(Request $request, User $user): UserResource
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'firstname' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', 'unique:users,email,' . $user->id],
            'phone_number' => ['nullable', 'string', 'max:255'],
            'password' => ['sometimes', 'required', 'string', 'min:8', 'confirmed'],
            'is_active' => ['sometimes', 'boolean'],
            'role' => ['sometimes', 'required', 'string', 'in:Administrateur,Correcteur,Jury,Ecole'],
        ]);

        $user->update(collect($validated)->except('role')->toArray());

        if (isset($validated['role'])) {
            $user->syncRoles([$validated['role']]);
        }

        return new UserResource($user->fresh()->load('school'));
    }

    public function destroy(User $user): Response
    {
        $user->delete();

        return response()->noContent();
    }
}
