self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-v1').then(function(cache) {
      return cache.addAll([
        '/cebuano-dictionary-js/',
        '/cebuano-dictionary-js/fallback.html',
        '/cebuano-dictionary-js/js/app.js',
        '/cebuano-dictionary-js/css/normalize.css',
        '/cebuano-dictionary-js/css/app.css',
        '/cebuano-dictionary-js/css/material-components-web.css'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || event.default();
    }).catch(function() {
      return caches.match('/my-blog/fallback.html');
    })
  );
});
