const CACHE_NAME = 'cai-links-cache-v1';
const urlsToCache = [
  './', // Caches the root HTML file (e.g., index.html)
  './index.html',
  './sw-icons//180x180.png',
  './sw-icons//192x192.png',
  './sw-icons//512x512.png',
  './sw-icons//1024x1024.png',
  // Add other critical static assets here
];

// 1. Installation: Pre-cache the App Shell
self.addEventListener('install', event => {
  // Wait until the promise is resolved before installing the SW
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and pre-caching essential files');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Fetching: Intercept network requests and serve from cache first
self.addEventListener('fetch', event => {
  // Only handle GET requests and exclude cross-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return the response from the cache
        if (response) {
          return response;
        }
        
        // No match in cache - fetch from the network
        return fetch(event.request);
      })
  );
});

// 3. Activation: Clean up old caches (optional but recommended)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});