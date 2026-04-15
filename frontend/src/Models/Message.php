<?php
declare(strict_types=1);

namespace App\Models;

class Message extends BaseModel
{
    public function create(string $name, string $email, string $message): bool
    {
        $stmt = $this->pdo->prepare('INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)');
        return $stmt->execute(['name' => $name, 'email' => $email, 'message' => $message]);
    }

    public function all(): array
    {
        return $this->pdo->query('SELECT * FROM messages ORDER BY id DESC')->fetchAll();
    }
}
