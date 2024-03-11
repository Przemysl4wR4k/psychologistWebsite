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

}
