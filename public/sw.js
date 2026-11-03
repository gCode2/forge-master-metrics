
const CACHE_NAME = 'forge-master-metrics-shell-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/fm.png',
  '/fm-2.png',
  '/favicon2.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith('forge-master-metrics-') &&
                key !== CACHE_NAME
            )
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.origin !== self.location.origin) return;

  if (/\/(auth|rest|storage|functions)\/v1\//.test(url.pathname)) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) =>
                cache.put('/index.html', copy)
              );
          }

          return response;
        })
        .catch(async () => {
          return (
            (await caches.match('/index.html')) ||
            (await caches.match('/'))
          );
        })
    );

    return;
  }

  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);

        if (cached) return cached;

        const response = await fetch(request);

        if (response.ok) {
          cache.put(request, response.clone());
        }

        return response;
      })
    );
  }
});
