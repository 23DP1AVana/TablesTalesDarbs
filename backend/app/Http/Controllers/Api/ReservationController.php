<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Reservation::query()->with([
            'user:id,username,email,role',
            'restaurant:id,name',
        ]);

        if ($user->role === 'user') {
            $query->where('user_id', $user->id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->input('status'));
        }

        $sort = $request->input('sort', 'newest');
        if ($sort === 'oldest') {
            $query->orderBy('reservation_at', 'asc');
        } else {
            $query->orderBy('reservation_at', 'desc');
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'restaurant_id' => ['required', Rule::exists('restaurants', 'id')],
            'reservation_at' => ['required', 'date'],
        ]);

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'restaurant_id' => $data['restaurant_id'],
            'reservation_at' => $data['reservation_at'],
            'status' => 'pending',
        ]);

        return response()->json($reservation, 201);
    }

    public function show(string $id)
    {
        $reservation = Reservation::with(['user:id,username,email,role', 'restaurant:id,name'])
            ->findOrFail($id);

        return response()->json($reservation);
    }

    public function update(Request $request, string $id)
    {
        $user = $request->user();
        if (!in_array($user->role, ['admin', 'representative'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $reservation = Reservation::findOrFail($id);
        $data = $request->validate([
            'status' => ['required', Rule::in(['pending', 'approved', 'cancelled'])],
        ]);
        $reservation->update(['status' => $data['status']]);

        return response()->json($reservation);
    }

    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $reservation = Reservation::findOrFail($id);

        if ($user->role === 'user' && $reservation->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted.']);
    }
}
