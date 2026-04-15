<?php
declare(strict_types=1);

namespace App\Controllers;

class ProfileController
{
    public function index(string $method): void
    {
        requireLogin();
        if ($method === 'POST' && csrf_validate($_POST['csrf'] ?? null)) {
            $_SESSION['user']['username'] = sanitize($_POST['username'] ?? currentUser()['username']);
            flash('success', 'Profile display name updated in session.');
            redirect('profile');
        }
        view('profile/index', ['title' => 'Profile']);
    }
}
