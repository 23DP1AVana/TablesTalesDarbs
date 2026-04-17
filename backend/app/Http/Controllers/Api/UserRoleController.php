<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserRoleController extends Controller
{
    public function index(Request $request)
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', Rule::in(['admin', 'representative', 'user'])],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:50'],
        ]);

        $query = User::query()
            ->select(['id', 'username', 'email', 'role', 'created_at'])
            ->orderBy('created_at', 'desc');

        if (!empty($data['search'])) {
            $search = trim($data['search']);
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (!empty($data['role'])) {
            $query->where('role', $data['role']);
        }

        $perPage = $data['per_page'] ?? 10;
        $users = $query->paginate($perPage)->withQueryString();

        return response()->json($users);
    }

    public function updateRole(Request $request, string $id)
    {
        $actor = $request->user();
        if ($actor->role !== 'admin') {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'role' => ['required', Rule::in(['admin', 'representative', 'user'])],
        ]);

        $user = User::findOrFail($id);

        if ($user->role === 'admin' && $data['role'] !== 'admin') {
            $adminCount = User::where('role', 'admin')->count();
            if ($adminCount <= 1) {
                return response()->json(['message' => 'Sistemā jāpaliek vismaz vienam admin lietotājam.'], 422);
            }
        }

        $user->update(['role' => $data['role']]);

        return response()->json([
            'message' => 'Loma veiksmīgi atjaunota.',
            'user' => $user->only(['id', 'username', 'email', 'role']),
        ]);
    }
}
