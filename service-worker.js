const CACHE_NAME = "mahesh-vegetable-bill-v5";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];


// ==============================
// INSTALL
// ==============================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

    self.skipWaiting();

});


// ==============================
// ACTIVATE
// ==============================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames
                        .filter(
                            name =>
                                name !== CACHE_NAME
                        )
                        .map(
                            name =>
                                caches.delete(name)
                        )

                );

            })

    );

    self.clients.claim();

});


// ==============================
// FETCH
// ==============================

self.addEventListener("fetch", event => {

    // Only handle GET requests
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(

        fetch(event.request)

            .then(response => {

                // Save latest version in cache

                const responseClone =
                    response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            event.request,
                            responseClone
                        );

                    });

                return response;

            })

            .catch(() => {

                // If internet is unavailable,
                // use cached version

                return caches.match(
                    event.request
                );

            })

    );

});