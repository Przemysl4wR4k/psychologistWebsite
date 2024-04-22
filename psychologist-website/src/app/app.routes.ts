import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CookiePolicyPageComponent } from './pages/cookie-policy-page/cookie-policy-page.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    // {path: 'home', redirectTo: ''} //ommited on purpose
    {path: 'cookies-policy', component: CookiePolicyPageComponent},
    {path: '**', component: PageNotFoundComponent}
]
