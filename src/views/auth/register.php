<section class="card">
  <h1>Register</h1>
  <form method="post" action="index.php?route=register">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Username <input type="text" name="username" minlength="3" maxlength="40" required></label>
    <label>Email <input type="email" name="email" required></label>
    <label>Password <input type="password" name="password" minlength="8" required></label>
    <button class="btn" type="submit">Register</button>
  </form>
</section>
