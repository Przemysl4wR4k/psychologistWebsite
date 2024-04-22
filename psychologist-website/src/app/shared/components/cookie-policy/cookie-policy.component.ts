import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss'
})
export class CookiePolicyComponent {
  isAccepted = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.isAccepted = localStorage.getItem('cookieConsent') === 'true'
    }
  }

  accept() {
    localStorage.setItem('cookieConsent', 'true')
    this.isAccepted = true
  }
}
