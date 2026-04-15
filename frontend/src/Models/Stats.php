<?php
declare(strict_types=1);

namespace App\Models;

class Stats extends BaseModel
{
    public function reservationsPerRestaurant(): array
    {
        $sql = "SELECT rest.name, COUNT(r.id) AS reservation_count
                FROM restaurants rest
                LEFT JOIN reservations r ON r.restaurant_id = rest.id
                GROUP BY rest.id
                ORDER BY reservation_count DESC";
        return $this->pdo->query($sql)->fetchAll();
    }
}
