<section class="card">
  <h1>Contact Us</h1>
  <form method="post" action="index.php?route=contact">
    <input type="hidden" name="csrf" value="<?= h(csrf_token()) ?>">
    <label>Name <input type="text" name="name" required maxlength="80"></label>
    <label>Email <input type="email" name="email" required></label>
    <label>Message <textarea name="message" minlength="5" required></textarea></label>
    <button class="btn" type="submit">Send Message</button>
  </form>
</section>
