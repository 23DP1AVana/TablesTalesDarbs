<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $admin = User::create([
            'username' => 'Admin',
            'email' => 'admin@local.test',
            'password' => Hash::make('Admin123!'),
            'role' => 'admin',
        ]);

        $representative = User::create([
            'username' => 'Representative',
            'email' => 'rep@local.test',
            'password' => Hash::make('Admin123!'),
            'role' => 'representative',
        ]);

        $user = User::create([
            'username' => 'StudentUser',
            'email' => 'user@local.test',
            'password' => Hash::make('Admin123!'),
            'role' => 'user',
        ]);

        $firstRestaurant = Restaurant::create([
            'name' => 'Riga Grill',
            'description' => 'Popular place for grilled dishes and simple menu.',
            'owner_id' => $representative->id,
        ]);

        $secondRestaurant = Restaurant::create([
            'name' => 'Daugava Bistro',
            'description' => 'Family friendly bistro with local food.',
            'owner_id' => $admin->id,
        ]);

        Reservation::create([
            'user_id' => $user->id,
            'restaurant_id' => $firstRestaurant->id,
            'reservation_at' => now()->addDays(1),
            'status' => 'pending',
        ]);

        Reservation::create([
            'user_id' => $user->id,
            'restaurant_id' => $secondRestaurant->id,
            'reservation_at' => now()->addDays(2),
            'status' => 'approved',
        ]);
    }
}
