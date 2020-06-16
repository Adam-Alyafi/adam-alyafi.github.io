importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: '/', revision: '2' },
    { url: '/index.html', revision: '2' },
    { url: '/nav.html', revision: '2' },
    { url: '/manifest.json', revision: '2' },
    { url: '/package.json', revision: '2' },
    { url: '/package-lock.json', revision: '2' },
    { url: '/push.js', revision: '2' },
    { url: '/icon.png', revision: '2' },
    { url: '/bundeslogo2.png', revision: '2' },
    { url: '/bundeslogo.png', revision: '2' },
    { url: '/bundesliga.png', revision: '2' },
    { url: '/pages/details.html', revision: '2' },
    { url: '/pages/home.html', revision: '2' },
    { url: '/pages/saved.html', revision: '2' },
    { url: '/pages/schedules.html', revision: '2' },
    { url: '/pages/standings.html', revision: '2' },
    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/css/materialize.css', revision: '2' },
    { url: '/js/db.js', revision: '2' },
    { url: '/js/idb.js', revision: '2' },
    { url: '/js/fetch.js', revision: '2' },
    { url: '/js/materialize.js', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/js/nav.js', revision: '2' },
    { url: '/match/augsburg-fc.html', revision: '2' },
    { url: '/match/bayer-04.html', revision: '2' },
    { url: '/match/borussia-monchen.html', revision: '2' },
    { url: '/match/bremen-sv.html', revision: '2' },
    { url: '/match/dortmund-09.html', revision: '2' },
    { url: '/match/fc-koln.html', revision: '2' },
    { url: '/match/fortuna-95.html', revision: '2' },
    { url: '/match/frankfurt-fc.html', revision: '2' },
    { url: '/match/freiburg-sc.html', revision: '2' },
    { url: '/match/hertha-bsc.html', revision: '2' },
    { url: '/match/leipzig-rb.html', revision: '2' },
    { url: '/match/mainz-05.html', revision: '2' },
    { url: '/match/munchen-fc.html', revision: '2' },
    { url: '/match/paderborn-07.html', revision: '2' },
    { url: '/match/schalke-04.html', revision: '2' },
    { url: '/match/tsg-hof.html', revision: '2' },
    { url: '/match/union-berlin.html', revision: '2' },
    { url: '/match/wolfsburg-fc.html', revision: '2' },
    { url: '/club/Bayer_04.png', revision: '2' },
    { url: '/club/Borussia_Dortmund.png', revision: '2' },
    { url: '/club/Borussia_M.png', revision: '2' },
    { url: '/club/Eintracht_Frankfurt.png', revision: '2' },
    { url: '/club/FC_Augsburg.png', revision: '2' },
    { url: '/club/FC_Bayern.png', revision: '2' },
    { url: '/club/FC_Schalke.png', revision: '2' },
    { url: '/club/FC_Union.png', revision: '2' },
    { url: '/club/fc-koln.png', revision: '2' },
    { url: '/club/Hertha_BSC.png', revision: '2' },
    { url: '/club/Mainz_05.png', revision: '2' },
    { url: '/club/RB-Leipzig-Logo.png', revision: '2' },
    { url: '/club/SC_Freiburg.png', revision: '2' },
    { url: '/club/SC_Paderborn.png', revision: '2' },
    { url: '/club/TSG_Hoffenheim.png', revision: '2' },
    { url: '/club/tsv-fortuna.png', revision: '2' },
    { url: '/club/VfL_Wolfsburg.png', revision: '2' },
    { url: '/club/Werder-Bremen.png', revision: '2' }
]);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 100,
            }),
        ]
    })
);

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '../icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});