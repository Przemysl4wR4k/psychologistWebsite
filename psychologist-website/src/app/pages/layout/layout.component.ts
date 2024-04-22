import { Component } from '@angular/core';
import { FooterComponent } from '../../sections/footer/footer.component';
import { NavbarComponent } from '../../sections/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { CookiePolicyComponent } from '../../shared/components/cookie-policy/cookie-policy.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AlertComponent, CookiePolicyComponent,FooterComponent, NavbarComponent, RouterOutlet, HomeComponent, AboutComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
 