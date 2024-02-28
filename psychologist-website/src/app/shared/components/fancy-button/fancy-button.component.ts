import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  standalone: true,
  imports: [],
  templateUrl: './fancy-button.component.html',
  styleUrl: './fancy-button.component.scss'
})
export class FancyButtonComponent {
  @Input() buttonText!: string

}
