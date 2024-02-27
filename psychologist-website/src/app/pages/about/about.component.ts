import { Component } from '@angular/core';
import { PersonCardComponent } from './person-card/person-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PersonCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
