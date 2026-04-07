<section class="card">
  <h1>Reservation Management</h1>
  <form class="row" method="get">
    <input type="hidden" name="route" value="reservations">
    <label>Filter status
      <select name="status">
        <option value="">All</option>
        <option value="pending" <?= $status === 'pending' ? 'selected' : '' ?>>Pending</option>
        <option value="approved" <?= $status === 'approved' ? 'selected' : '' ?>>Approved</option>
        <option value="cancelled" <?= $status === 'cancelled' ? 'selected' : '' ?>>Cancelled</option>
      </select>
    </label>
    <label>Sort
      <select name="sort">
        <option value="date" <?= $sort === 'date' ? 'selected' : '' ?>>Date</option>
        <option value="status" <?= $sort === 'status' ? 'selected' : '' ?>>Status</option>
      </select>
    </label>
    <button class="btn" type="submit">Apply</button>
  </form>
  <?php foreach ($reservations as $r): ?>
    <article class="item">
      <strong><?= h($r['restaurant_name']) ?></strong> — <?= h($r['date']) ?> — <?= h($r['status']) ?> (<?= h($r['username']) ?>)
      <?php if (hasRole('admin', 'representative')): ?>
        <form method="post" action="index.php?route=reservation.updateStatus">
          <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
          <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
          <select name="status">
            <option value="pending">pending</option>
            <option value="approved">approved</option>
            <option value="cancelled">cancelled</option>
          </select>
          <button class="btn" type="submit">Update</button>
        </form>
      <?php endif; ?>
    </article>
  <?php endforeach; ?>
</section>
