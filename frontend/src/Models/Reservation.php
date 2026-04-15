<?php
declare(strict_types=1);

namespace App\Models;

class Reservation extends BaseModel
{
    public function create(int $userId, int $restaurantId, string $date): bool
    {
        $status = 'pending';
        $stmt = $this->pdo->prepare(
            'INSERT INTO reservations (user_id, restaurant_id, date, status)
             VALUES (:user_id, :restaurant_id, :date, :status)'
        );
        return $stmt->execute([
            'user_id' => $userId,
            'restaurant_id' => $restaurantId,
            'date' => $date,
            'status' => $status,
        ]);
    }

    public function listWithJoin(?int $userId = null, ?int $ownerId = null, string $status = '', string $sort = 'date'): array
    {
        $allowedSort = ['date', 'status', 'id'];
        if (!in_array($sort, $allowedSort, true)) {
            $sort = 'date';
        }

        $sql = "SELECT r.id, r.date, r.status, u.username, rest.name AS restaurant_name, rest.owner_id
                FROM reservations r
                JOIN users u ON r.user_id = u.id
                JOIN restaurants rest ON r.restaurant_id = rest.id
                WHERE 1=1";
        $params = [];

        if ($userId !== null) {
            $sql .= ' AND r.user_id = :user_id';
            $params['user_id'] = $userId;
        }
        if ($ownerId !== null) {
            $sql .= ' AND rest.owner_id = :owner_id';
            $params['owner_id'] = $ownerId;
        }
        if ($status !== '') {
            $sql .= ' AND r.status = :status';
            $params['status'] = $status;
        }
        $sql .= " ORDER BY r.$sort ASC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function updateStatus(int $id, string $status): bool
    {
        $stmt = $this->pdo->prepare('UPDATE reservations SET status = :status WHERE id = :id');
        return $stmt->execute(['id' => $id, 'status' => $status]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->pdo->prepare('DELETE FROM reservations WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }
}
