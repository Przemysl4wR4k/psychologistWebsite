import { Component } from '@angular/core';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FancyButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
