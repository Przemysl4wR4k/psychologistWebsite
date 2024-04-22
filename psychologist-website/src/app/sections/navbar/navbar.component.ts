import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FancyButtonComponent],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle()
  }

  logout() {
    this.authService.logout()
  }
}