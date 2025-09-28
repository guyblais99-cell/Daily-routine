// /public/sw.js
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/', // The start page
  '/index.html',
  '/manifest.json',
  '/app.js',
  // Add your key icons here (browsers look for these to be cached)
  '/icon-192x192.png', 
  '/icon-512x512.png',
  // Add any CSS files if you have them
  // '/styles.css',
];

// Install event: Caches the essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and adding shell assets');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Serves content from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // No cache hit - fetch from network
        return fetch(event.request);
      })
  );
});

// Activate event: Cleans up old caches (important for updates)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});