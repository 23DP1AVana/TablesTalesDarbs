<?php
declare(strict_types=1);

function config(string $key): mixed
{
    $values = [
        'db_path' => __DIR__ . '/../../database/app.sqlite',
        'app_name' => 'Tables & Tales',
    ];
    return $values[$key] ?? null;
}

function view(string $template, array $data = []): void
{
    extract($data, EXTR_SKIP);
    $templateFile = __DIR__ . '/../views/' . $template . '.php';
    require __DIR__ . '/../views/layout/header.php';
    require $templateFile;
    require __DIR__ . '/../views/layout/footer.php';
}

function redirect(string $route): void
{
    header('Location: index.php?route=' . urlencode($route));
    exit;
}

function currentUser(): ?array
{
    return $_SESSION['user'] ?? null;
}

function isLoggedIn(): bool
{
    return isset($_SESSION['user']);
}

function hasRole(string ...$roles): bool
{
    $user = currentUser();
    return $user !== null && in_array($user['role'], $roles, true);
}

function flash(string $key, ?string $message = null): ?string
{
    if ($message !== null) {
        $_SESSION['flash'][$key] = $message;
        return null;
    }

    if (!isset($_SESSION['flash'][$key])) {
        return null;
    }
    $val = $_SESSION['flash'][$key];
    unset($_SESSION['flash'][$key]);
    return $val;
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
