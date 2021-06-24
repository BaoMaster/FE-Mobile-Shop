importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyDufSr8JhJZ_y7s8OU8slFMjuI3tYJaHik',
  authDomain: 'fir-testing-72329.firebaseapp.com',
  projectId: 'fir-testing-72329',
  storageBucket: 'fir-testing-72329.appspot.com',
  messagingSenderId: '30676038536',
  appId: '1:30676038536:web:c76c176b2381f38bdb803d',
  measurementId: 'G-S88RTGCH4L',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
