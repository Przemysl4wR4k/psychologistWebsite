import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-item',
  standalone: true,
  imports: [],
  templateUrl: './footer-item.component.html',
  styleUrl: './footer-item.component.scss'
})

export class FooterItemComponent {
  @Input() icon!: string;
  @Input() contactType!: string;
  @Input() contactInfo!: string;
}
