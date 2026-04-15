<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\User;

class AuthController
{
    public function register(string $method): void
    {
        if ($method === 'POST') {
            if (!csrf_validate($_POST['csrf'] ?? null)) {
                flash('error', 'Invalid CSRF token.');
                redirect('register');
            }

            $username = sanitize($_POST['username'] ?? '');
            $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
            $password = $_POST['password'] ?? '';

            if ($username === '' || $email === '' || strlen($password) < 8) {
                flash('error', 'Invalid registration input.');
                redirect('register');
            }

            $userModel = new User();
            if ($userModel->findByEmail($email)) {
                flash('error', 'Email already registered.');
                redirect('register');
            }
            $userModel->create($username, $email, password_hash($password, PASSWORD_DEFAULT), 'user');
            flash('success', 'Registration successful. Please login.');
            redirect('login');
        }
        view('auth/register', ['title' => 'Register']);
    }

    public function login(string $method): void
    {
        if ($method === 'POST') {
            if (!csrf_validate($_POST['csrf'] ?? null)) {
                flash('error', 'Invalid CSRF token.');
                redirect('login');
            }
            $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
            $password = $_POST['password'] ?? '';
            $user = (new User())->findByEmail($email);

            if (!$user || !password_verify($password, $user['password'])) {
                flash('error', 'Invalid credentials.');
                redirect('login');
            }

            session_regenerate_id(true);
            $_SESSION['user'] = [
                'id' => (int) $user['id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'role' => $user['role'],
            ];
            flash('success', 'Welcome back!');
            redirect('dashboard');
        }
        view('auth/login', ['title' => 'Login']);
    }

    public function logout(): void
    {
        $_SESSION = [];
        session_destroy();
        session_start();
        flash('success', 'Logged out.');
        redirect('home');
    }
}
