import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() personName!: string;
  @Input() personTitle!: string;
  @Input() personDescription!: string;
}
