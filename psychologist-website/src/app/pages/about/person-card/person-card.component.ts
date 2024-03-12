import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FancyButtonComponent } from '../../../shared/components/fancy-button/fancy-button.component';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
  }

  openLink(): void {
    window.open(this.link, '_blank');
  }
  redirectToPersonPage() {
    this.router.navigate(['/about', this.personName]);
  }

}
