import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FancyButtonComponent } from '../../../shared/components/fancy-button/fancy-button.component';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, FontAwesomeModule],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {

  @Input() personPhoto!: string
  @Input() personName!: string
  @Input() tags!: string[]
  @Input() personDescription!: string
  @Input() link!: string

  @Output() editPerson = new EventEmitter<void>()
  @Output() deletePerson = new EventEmitter()

  faEdit = faEdit
  faTrash = faTrash

  constructor() {
  }

  openLink(): void {
    window.open(this.link, '_blank')
  }
}
