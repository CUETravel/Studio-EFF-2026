const CACHE = "studio-edinburgh-trip-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./images/hero.jpg",
  "./images/show-jolly-fisherman.jpg",
  "./images/show-dracula.jpg",
  "./images/show-hole.jpg",
  "./images/show-david-elms.jpg",
  "./images/show-roleplay.jpg",
  "./images/show-lions.jpg",
  "./images/show-ten-thousand-hours.jpg",
  "./images/show-ahir-shah.jpg",
  "./images/show-garry-starr.jpg",
  "./images/show-bog-witch.jpg",
  "./images/show-after-party.jpg",
  "./images/venue-scotsman.jpg",
  "./images/venue-bonham-deansuite.jpg",
  "./images/venue-tattoo.jpg",
  "./images/venue-dean-village.jpg",
  "./images/venue-colonnades.jpg",
  "./images/venue-glasshouse.jpg",
  "./images/venue-castle-sunset.jpg",
  "./images/venue-divino.jpg",
  "./icons/icon-180.png",
  "./icons/icon-512.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
