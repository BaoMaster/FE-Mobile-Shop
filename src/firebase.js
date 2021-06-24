import 'firebase/messaging';

import firebase from 'firebase/app';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDufSr8JhJZ_y7s8OU8slFMjuI3tYJaHik',
    authDomain: 'fir-testing-72329.firebaseapp.com',
    projectId: 'fir-testing-72329',
    storageBucket: 'fir-testing-72329.appspot.com',
    messagingSenderId: '30676038536',
    appId: '1:30676038536:web:c76c176b2381f38bdb803d',
    measurementId: 'G-S88RTGCH4L',
  });
} else {
  firebase.app(); // if already initialized, use that one
}
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({ vapidKey: 'BNDAj7lNVHR7oC862YJy8sSinMwARB0ih5oKrVQLARN-YS0q5DXAVNGxtazO2IViZPLc_d4bDkyc5pAVuAUpXzc' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
