<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\Stats;

class DashboardController
{
    public function index(): void
    {
        requireLogin();
        $user = currentUser();

        $stats = (new Stats())->reservationsPerRestaurant();
        $restaurants = (new Restaurant())->all();
        $reservations = (new Reservation())->listWithJoin(
            $user['role'] === 'user' ? (int) $user['id'] : null,
            $user['role'] === 'representative' ? (int) $user['id'] : null
        );

        view('dashboard/index', [
            'title' => 'Dashboard',
            'stats' => $stats,
            'restaurants' => $restaurants,
            'reservations' => $reservations,
        ]);
    }
}
