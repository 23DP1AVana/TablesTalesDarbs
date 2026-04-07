<?php
declare(strict_types=1);

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    if (strpos($class, $prefix) !== 0) {
        return;
    }
    $relative = substr($class, strlen($prefix));
    $file = __DIR__ . '/../' . str_replace('\\', '/', $relative) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/security.php';

$db = App\Core\Database::getInstance();
$db->initializeSchemaIfNeeded(__DIR__ . '/../../database/schema.sql');
