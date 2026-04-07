<?php
declare(strict_types=1);

namespace App\Models;

class User extends BaseModel
{
    public function create(string $username, string $email, string $passwordHash, string $role = 'user'): bool
    {
        $sql = 'INSERT INTO users (username, email, password, role) VALUES (:username, :email, :password, :role)';
        $stmt = $this->pdo->prepare($sql);
        return $stmt->execute([
            'username' => $username,
            'email' => $email,
            'password' => $passwordHash,
            'role' => $role,
        ]);
    }

    public function findByEmail(string $email): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
        $stmt->execute(['email' => $email]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function all(): array
    {
        return $this->pdo->query('SELECT id, username, email, role FROM users ORDER BY id DESC')->fetchAll();
    }

    public function updateRole(int $id, string $role): bool
    {
        $stmt = $this->pdo->prepare('UPDATE users SET role = :role WHERE id = :id');
        return $stmt->execute(['id' => $id, 'role' => $role]);
    }
}
