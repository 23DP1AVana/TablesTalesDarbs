<section class="card">
  <h1>Login</h1>
  <form method="post" action="index.php?route=login">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Email <input type="email" name="email" required></label>
    <label>Password <input type="password" name="password" minlength="8" required></label>
    <button class="btn" type="submit">Login</button>
  </form>
</section>
