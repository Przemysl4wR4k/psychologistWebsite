import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fancy-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fancy-button.component.html',
  styleUrl: './fancy-button.component.scss'
})
export class FancyButtonComponent {
  @Input() buttonText!: string
  @Input() buttonSize: ButtonSize = ButtonSize.L

  protected getStyle() {
    switch (this.buttonSize) {
      // case ButtonSize.S:
      //   return {'background-color': 'red'}
      case ButtonSize.M:
        return {
          '--offset': '2px',
          '-border-size': '1px',
          'padding': '0.5em 1em',
          'letter-spacing': '.0625em'
        }
      case ButtonSize.L:
        return {
          '--offset': '5px',
          '-border-size': '1px',
          'padding': '0.75em 1.5em',
          'letter-spacing': '.125em'
        }
      case ButtonSize.XL:
        return {
          '--offset': '10px',
          '-border-size': '2px',
          'padding': '1em 2em',
          'letter-spacing': '.25em'
        }
    }      
  }

}

export enum ButtonSize { 
  // S = 'small',
  M = 'medium',
  L = 'large',
  XL = 'extra-large'
}