<?php
declare(strict_types=1);

namespace App\Models;

class Restaurant extends BaseModel
{
    public function all(string $search = '', string $sort = 'name'): array
    {
        $allowedSort = ['name', 'id'];
        if (!in_array($sort, $allowedSort, true)) {
            $sort = 'name';
        }
        $stmt = $this->pdo->prepare(
            "SELECT r.*, u.username AS owner_name
             FROM restaurants r
             LEFT JOIN users u ON r.owner_id = u.id
             WHERE r.name LIKE :search OR r.description LIKE :search
             ORDER BY r.$sort ASC"
        );
        $stmt->execute(['search' => '%' . $search . '%']);
        return $stmt->fetchAll();
    }

    public function create(string $name, string $description, int $ownerId): bool
    {
        $stmt = $this->pdo->prepare('INSERT INTO restaurants (name, description, owner_id) VALUES (:name, :description, :owner_id)');
        return $stmt->execute(['name' => $name, 'description' => $description, 'owner_id' => $ownerId]);
    }

    public function update(int $id, string $name, string $description): bool
    {
        $stmt = $this->pdo->prepare('UPDATE restaurants SET name = :name, description = :description WHERE id = :id');
        return $stmt->execute(['id' => $id, 'name' => $name, 'description' => $description]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM restaurants WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    public function find(int $id): ?array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM restaurants WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}
