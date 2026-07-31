// sw.js (في الجذر الرئيسي للمشروع)
const CACHE_NAME = 'vortex-core-v1';
const ASSETS = [
    '/',
    '/src/index.html',
    '/assets/css/madi-cyber-theme.css',
    '/src/adaptive-perf.js',
    '/src/main.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
