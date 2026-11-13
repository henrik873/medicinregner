const CACHE_NAME = "medicinregner-v22";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./om-app.html",
    "./faglige-emner.html",
    "./manifest.json",
    "./apple-touch-icon-v2.png",
    "./icon-192-v2.png",
    "./icon-512-v2.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    );

});

self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cacheName => cacheName.startsWith("medicinregner-") && cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            ))
            .then(() => self.clients.claim())
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(
        caches.open(CACHE_NAME)
            .then(cache => cache.match(event.request))
            .then(response => {
                return response || fetch(event.request);
            })
    );

});
