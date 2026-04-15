<section class="card">
  <h1>Dashboard</h1>
  <p>Your role: <strong><?= h(currentUser()['role']) ?></strong></p>
</section>
<section class="card">
  <h2>Reservation Statistics</h2>
  <?php foreach ($stats as $s): ?>
    <p><?= h($s['name']) ?>: <?= (int) $s['reservation_count'] ?></p>
  <?php endforeach; ?>
</section>
