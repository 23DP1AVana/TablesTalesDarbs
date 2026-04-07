<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Message;
use App\Models\Stats;
use App\Models\User;

class AdminController
{
    public function index(): void
    {
        requireRole('admin');
        view('admin/index', [
            'title' => 'Admin Panel',
            'stats' => (new Stats())->reservationsPerRestaurant(),
            'messages' => (new Message())->all(),
        ]);
    }

    public function users(string $method): void
    {
        requireRole('admin');
        $userModel = new User();
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            $id = (int) ($_POST['id'] ?? 0);
            $role = sanitize($_POST['role'] ?? 'user');
            if (in_array($role, ['admin', 'representative', 'user'], true)) {
                $userModel->updateRole($id, $role);
                flash('success', 'User role updated.');
            }
            redirect('admin.users');
        }
        view('admin/users', ['title' => 'Manage Users', 'users' => $userModel->all()]);
    }
}
