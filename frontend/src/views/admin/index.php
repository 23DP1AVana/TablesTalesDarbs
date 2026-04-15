<section class="card">
  <h1>Admin Panel</h1>
  <p><a class="btn" href="index.php?route=admin.users">Manage Users</a></p>
  <h2>Messages</h2>
  <?php foreach ($messages as $m): ?>
    <article class="item">
      <strong><?= h($m['name']) ?></strong> (<?= h($m['email']) ?>)
      <p><?= h($m['message']) ?></p>
    </article>
  <?php endforeach; ?>
</section>
