const CACHE = 'libro-recetas-v1';
const SHELL = [
  '/cookbook/app/',
  '/cookbook/app/index.html',
  '/cookbook/app/style.css',
  '/cookbook/app/data.js',
  '/cookbook/app/db.js',
  '/cookbook/app/app.js',
  '/cookbook/app/fonts/Syne-VariableFont_wght.ttf',
  '/cookbook/app/manifest.json',
  '/cookbook/app/icons/icon-192.svg',
  '/cookbook/app/icons/icon-512.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => caches.match('/cookbook/app/index.html'));
    })
  );
});
