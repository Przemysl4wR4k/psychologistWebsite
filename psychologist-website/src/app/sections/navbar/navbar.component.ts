import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FancyButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
}
