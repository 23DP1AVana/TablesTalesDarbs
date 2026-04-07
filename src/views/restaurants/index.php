<section class="card">
  <h1>Restaurants</h1>
  <form class="row" method="get">
    <input type="hidden" name="route" value="restaurants">
    <label>Search <input type="search" name="search" value="<?= h($search) ?>"></label>
    <label>Sort
      <select name="sort">
        <option value="name" <?= $sort === 'name' ? 'selected' : '' ?>>Name</option>
        <option value="id" <?= $sort === 'id' ? 'selected' : '' ?>>Newest</option>
      </select>
    </label>
    <button class="btn" type="submit">Apply</button>
  </form>
  <?php foreach ($restaurants as $r): ?>
    <article class="item">
      <h3><?= h($r['name']) ?></h3>
      <p><?= h($r['description']) ?></p>
      <small>Owner: <?= h((string) ($r['owner_name'] ?? 'N/A')) ?></small>
      <?php if (hasRole('user')): ?>
        <form method="post" action="index.php?route=reservation.create">
          <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
          <input type="hidden" name="restaurant_id" value="<?= (int) $r['id'] ?>">
          <label>Date <input type="date" name="date" required></label>
          <button class="btn" type="submit">Reserve</button>
        </form>
      <?php endif; ?>
    </article>
  <?php endforeach; ?>
</section>

<?php if (hasRole('admin', 'representative')): ?>
<section class="card">
  <h2>Create Restaurant</h2>
  <form method="post" action="index.php?route=restaurant.create">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Name <input type="text" name="name" required></label>
    <label>Description <textarea name="description" required></textarea></label>
    <button class="btn" type="submit">Create</button>
  </form>
</section>
<?php endif; ?>
