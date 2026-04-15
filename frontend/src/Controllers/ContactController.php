<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Models\Message;

class ContactController
{
    public function index(string $method): void
    {
        if ($method === 'POST') {
            if (!csrf_validate($_POST['csrf'] ?? null)) {
                flash('error', 'Invalid CSRF token.');
                redirect('contact');
            }
            $name = sanitize($_POST['name'] ?? '');
            $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
            $messageText = sanitize($_POST['message'] ?? '');
            if ($name === '' || $email === '' || strlen($messageText) < 5) {
                flash('error', 'Please fill valid contact data.');
                redirect('contact');
            }
            (new Message())->create($name, $email, $messageText);
            flash('success', 'Message sent successfully.');
            redirect('contact');
        }
        view('contact/index', ['title' => 'Contact Us']);
    }
}
