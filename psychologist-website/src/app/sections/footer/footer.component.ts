import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ContactType, FooterItemComponent } from './footer-item/footer-item.component';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, FooterItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent implements OnInit {
  faLocationDot = faLocationDot
  faPhone = faPhone
  faPaperPlane = faPaperPlane
  contactTypes = ContactType

  constructor(private firestore: Firestore) {

  }

  ngOnInit(): void {
      this.getData()
  }
  async getData(){
    const contactDocRef = doc(this.firestore, 'collection/contact');
    try {
      const docSnap = await getDoc(contactDocRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }
}
