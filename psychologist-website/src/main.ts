import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from 'firebase/app';
import { environment } from './environment';


const firebaseConfig = environment.firebaseConfig

const app = initializeApp(firebaseConfig)
console.log(app)
// console.log(appFB)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
