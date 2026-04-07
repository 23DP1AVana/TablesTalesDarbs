<?php $user = currentUser(); ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#1f2937">
  <title><?= h(($title ?? 'App') . ' | ' . config('app_name')) ?></title>
  <link rel="manifest" href="manifest.json">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<header class="container">
  <nav class="nav" aria-label="Main navigation">
    <a href="index.php?route=home"><?= h(config('app_name')) ?></a>
    <a href="index.php?route=restaurants">Restaurants</a>
    <a href="index.php?route=contact">Contact</a>
    <?php if ($user): ?>
      <a href="index.php?route=reservations">Reservations</a>
      <a href="index.php?route=dashboard">Dashboard</a>
      <a href="index.php?route=profile">Profile</a>
      <?php if ($user['role'] === 'admin'): ?><a href="index.php?route=admin">Admin</a><?php endif; ?>
      <a href="index.php?route=logout">Logout</a>
    <?php else: ?>
      <a href="index.php?route=login">Login</a>
      <a href="index.php?route=register">Register</a>
    <?php endif; ?>
  </nav>
</header>
<main class="container">
  <?php if ($msg = flash('success')): ?><p class="alert ok"><?= h($msg) ?></p><?php endif; ?>
  <?php if ($msg = flash('error')): ?><p class="alert err"><?= h($msg) ?></p><?php endif; ?>
