import { Component } from '@angular/core';
import { FancyButtonComponent, ButtonSize } from '../../shared/components/fancy-button/fancy-button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FancyButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  buttonSize = ButtonSize
}
