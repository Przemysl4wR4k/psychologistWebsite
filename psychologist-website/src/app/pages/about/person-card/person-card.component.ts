import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FancyButtonComponent } from '../../../shared/components/fancy-button/fancy-button.component';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() personName!: string;
  @Input() tags!: string[];
  @Input() personDescription!: string;
  
  showWidget = false
}
