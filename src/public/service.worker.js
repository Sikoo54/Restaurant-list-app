importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js'
);

if (workbox) {
  console.log('Workbox is loaded');

  // Precache assets (HTML, CSS, JS, dan gambar)
  workbox.precaching.precacheAndRoute([
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
  ]);

  // Cache API dengan strategi StaleWhileRevalidate
  workbox.routing.registerRoute(
    new RegExp('https://api.example.com/data'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api-data',
    })
  );

  // Cache halaman navigasi untuk SPA
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'html-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24,
        }),
      ],
    })
  );
}
