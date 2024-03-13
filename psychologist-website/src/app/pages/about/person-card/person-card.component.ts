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

  @Input() personPhoto!: string;
  @Input() personName!: string;
  @Input() tags!: string[];
  @Input() personDescription!: string;
  @Input() link!: string;

  constructor() {
  }

  openLink(): void {
    window.open(this.link, '_blank');
  }
}
