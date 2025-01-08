self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('password-manager-cache').then((cache) => {
          return cache.addAll([
              './',
              './index.html',
              './styles.css',
              './app.js',
              './manifest.json',
              './assets/icons/icon-192x192.png',
              './assets/icons/icon-512x512.png'
          ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
          return response || fetch(event.request);
      })
  );
});
