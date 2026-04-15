<section class="card">
  <h1>Manage Users</h1>
  <?php foreach ($users as $u): ?>
    <form class="row" method="post" action="index.php?route=admin.users">
      <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
      <input type="hidden" name="id" value="<?= (int) $u['id'] ?>">
      <span><?= h($u['username']) ?> (<?= h($u['email']) ?>)</span>
      <select name="role">
        <?php foreach (['admin', 'representative', 'user'] as $role): ?>
          <option value="<?= $role ?>" <?= $u['role'] === $role ? 'selected' : '' ?>><?= $role ?></option>
        <?php endforeach; ?>
      </select>
      <button class="btn" type="submit">Update role</button>
    </form>
  <?php endforeach; ?>
</section>
