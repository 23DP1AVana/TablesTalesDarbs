const CACHE = 'tables-tales-v1';
const ASSETS = ['index.php?route=home', 'assets/css/style.css', 'assets/js/app.js', 'manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
