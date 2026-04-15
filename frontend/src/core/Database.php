<?php
declare(strict_types=1);

namespace App\Core;

use PDO;

class Database
{
    private static ?self $instance = null;
    private PDO $pdo;

    private function __construct()
    {
        $dbPath = config('db_path');
        $this->pdo = new PDO('sqlite:' . $dbPath);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        $this->pdo->exec('PRAGMA foreign_keys = ON;');
    }

    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function pdo(): PDO
    {
        return $this->pdo;
    }

    public function initializeSchemaIfNeeded(string $schemaPath): void
    {
        $query = "SELECT name FROM sqlite_master WHERE type='table' AND name='users'";
        $exists = $this->pdo->query($query)->fetchColumn();
        if ($exists) {
            return;
        }

        $schema = file_get_contents($schemaPath);
        if ($schema !== false) {
            $this->pdo->exec($schema);
        }
    }
}
