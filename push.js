var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BE6W8EVH_ck8UtjhPW8fWts_CnjmvjZ3jmmylVuDHkOPzNJc_WV-c3nglJWnHH5Mcd250CwOqYUqzSFpV8K7kH0",
    "privateKey": "ddblUxPbLMZ0k1_uBUC1S_2t5KprqseFehXxaZMjcxY"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c-f-RifaZA0:APA91bHthkDj7UqwlbrtEBbIgTADuIgvcVM3m4Rs2-Cs_nAVbD7pJT4wQG7yhYNVhcXxyjWZakYIbjM0jLmxLIuQMwXeAuk2YtIDuzsJ6Z1YIkM4m5_DztAQCCFfKmmSzYsujmclIykG",
    "keys": {
        "p256dh": "BC5TAtsgyS0UD2IZEqd0HBPis9EzUsvqbT2shx65LLk4PHq9uBNR3chlGY1ICkaQk7t0WeZgGx2SbHCSLj-1BR0",
        "auth": "xv0QcBmrNrid6wMB2LXoOA"
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '1039797900038',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);