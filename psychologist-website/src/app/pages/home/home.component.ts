import { Component } from '@angular/core';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FancyButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected getSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
      return 'winter';
    } else if (month >= 5 && month <= 7) {
      return 'summer';
    } else if (month >= 8 && month <= 10) {
      return 'autumn';
    } 
    return 'winter';
  }
}
