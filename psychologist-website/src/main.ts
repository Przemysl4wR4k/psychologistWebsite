import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';
import * as dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env?.['FIREBASE_API_KEY'],
  authDomain: process.env?.['FIREBASE_AUTH_DOMAIN'],
  projectId: process.env?.['FIREBASE_PROJECT_ID'],
  storageBucket: process.env?.['FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: process.env?.['FIREBASE_MESSAGING_SENDER_ID'],
  appId: process.env?.['FIREBASE_APP_ID'],
  measurementId: process.env?.['FIREBASE_MEASUREMENT_ID']
}

const app = initializeApp(firebaseConfig)
console.log(app)
// console.log(appFB)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
