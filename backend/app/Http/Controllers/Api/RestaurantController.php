<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RestaurantController extends Controller
{
    public function index(Request $request)
    {
        $query = Restaurant::query()->with('owner:id,username,email,role');

        if ($request->filled('search')) {
            $search = $request->string('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $sort = $request->input('sort', 'name_asc');
        if ($sort === 'name_desc') {
            $query->orderBy('name', 'desc');
        } else {
            $query->orderBy('name', 'asc');
        }

        $restaurants = $query->get();

        return response()->json($restaurants);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!in_array($user->role, ['admin', 'representative'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:2000'],
            'owner_id' => ['nullable', Rule::exists('users', 'id')],
        ]);

        $restaurant = Restaurant::create($data);

        return response()->json($restaurant, 201);
    }

    public function show(string $id)
    {
        $restaurant = Restaurant::with('owner:id,username,email,role')->findOrFail($id);
        return response()->json($restaurant);
    }

    public function update(Request $request, string $id)
    {
        $user = $request->user();
        if (!in_array($user->role, ['admin', 'representative'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $restaurant = Restaurant::findOrFail($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:2000'],
            'owner_id' => ['nullable', Rule::exists('users', 'id')],
        ]);

        $restaurant->update($data);

        return response()->json($restaurant);
    }

    public function destroy(string $id)
    {
        $user = request()->user();
        if (!in_array($user->role, ['admin', 'representative'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();

        return response()->json(['message' => 'Restaurant deleted.']);
    }
}
