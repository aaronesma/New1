// Keeps the app shell available so it opens instantly from the Home Screen.
// Network first for the page, so updates show up on the next launch.
const CACHE = 'masquerade-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/apple-touch-icon.png', './icons/icon-192.png',
               'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('peerjs.com')) return; // live call server, never cache
  e.respondWith(
    fetch(req).then(res => {
      if (res.ok && (url.origin === location.origin || url.hostname === 'unpkg.com')) {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req, {ignoreSearch: true}))
  );
});
