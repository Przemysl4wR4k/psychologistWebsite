import {initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyD1JlNhaFctW-LmAT5Ubm3PMakxLNB6ztc",
    authDomain: "psychologistwebsite.firebaseapp.com",
    projectId: "psychologistwebsite",
    storageBucket: "psychologistwebsite.appspot.com",
    messagingSenderId: "198413188626",
    appId: "1:198413188626:web:40c2cb380e4cb14d3be2cb",
    measurementId: "G-WD2V264E44"
  }

export const appFB = initializeApp(firebaseConfig);
    