<section class="card">
  <h1>User Profile</h1>
  <p>Email: <?= h(currentUser()['email']) ?></p>
  <p>Role: <?= h(currentUser()['role']) ?></p>
  <form method="post" action="index.php?route=profile">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Display name <input type="text" name="username" value="<?= h(currentUser()['username']) ?>"></label>
    <button class="btn" type="submit">Update</button>
  </form>
</section>
