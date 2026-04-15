<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function index()
    {
        $reservationByRestaurant = Reservation::query()
            ->select('restaurants.name as restaurant_name', DB::raw('COUNT(reservations.id) as total'))
            ->join('restaurants', 'restaurants.id', '=', 'reservations.restaurant_id')
            ->groupBy('restaurants.name')
            ->orderBy('total', 'desc')
            ->get();

        return response()->json([
            'total_users' => User::count(),
            'total_restaurants' => Restaurant::count(),
            'total_reservations' => Reservation::count(),
            'reservation_by_restaurant' => $reservationByRestaurant,
        ]);
    }
}
