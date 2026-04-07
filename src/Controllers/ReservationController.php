<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Reservation;

class ReservationController
{
    public function index(): void
    {
        requireLogin();
        $status = sanitize($_GET['status'] ?? '');
        $sort = sanitize($_GET['sort'] ?? 'date');
        $user = currentUser();

        $userId = $user['role'] === 'user' ? (int) $user['id'] : null;
        $ownerId = $user['role'] === 'representative' ? (int) $user['id'] : null;
        $reservations = (new Reservation())->listWithJoin($userId, $ownerId, $status, $sort);

        view('reservations/index', compact('reservations', 'status', 'sort') + ['title' => 'Reservations']);
    }

    public function create(string $method): void
    {
        requireRole('user');
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            $restaurantId = (int) ($_POST['restaurant_id'] ?? 0);
            $date = sanitize($_POST['date'] ?? '');
            if ($restaurantId > 0 && $date !== '') {
                (new Reservation())->create((int) currentUser()['id'], $restaurantId, $date);
                flash('success', 'Reservation created.');
            }
        }
        redirect('reservations');
    }

    public function updateStatus(string $method): void
    {
        requireRole('admin', 'representative');
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            $id = (int) ($_POST['id'] ?? 0);
            $status = sanitize($_POST['status'] ?? 'pending');
            if (in_array($status, ['pending', 'approved', 'cancelled'], true)) {
                (new Reservation())->updateStatus($id, $status);
                flash('success', 'Reservation status updated.');
            }
        }
        redirect('reservations');
    }

    public function delete(string $method): void
    {
        requireRole('admin', 'user');
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            (new Reservation())->delete((int) ($_POST['id'] ?? 0));
            flash('success', 'Reservation deleted.');
        }
        redirect('reservations');
    }
}
