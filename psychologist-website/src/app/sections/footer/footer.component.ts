import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ContactType, FooterItemComponent } from './footer-item/footer-item.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, FooterItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  faLocationDot = faLocationDot
  faPhone = faPhone
  faPaperPlane = faPaperPlane
  contactTypes = ContactType
}
