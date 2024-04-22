import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ContactType } from '../footer.service';

@Component({
  selector: 'app-footer-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer-item.component.html',
  styleUrl: './footer-item.component.scss'
})

export class FooterItemComponent {
  @Input() icon!: IconDefinition
  @Input() contactType!: ContactType
  @Input() contactInfo: string | undefined

  contactTypes = ContactType
}


