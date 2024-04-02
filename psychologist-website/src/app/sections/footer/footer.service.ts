import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { IconDefinition, faLocationDot, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FooterService {
  constructor(private firestore: Firestore) {}

  getContactData(): Observable<ContactData[]> {
    const contactDocRef = doc(this.firestore, 'collection/contact')
    return docData(contactDocRef).pipe(map((response: any) => {
      return response.contactData.map((data: ContactData) => ({
        ...data,
        // @ts-ignore
        contactType: ContactType[data.contactType],
        // @ts-ignore
        icon: this.getIconForContactType(ContactType[data.contactType])
      })) as ContactData[]
    }))
  }

  private getIconForContactType(contactType: ContactType): IconDefinition {
    switch (contactType) {
      case ContactType.PHONE:
        return faPhone;
      case ContactType.EMAIL:
        return faPaperPlane;
      case ContactType.ADDRESS:
        return faLocationDot;
      default:
        throw new Error(`Unknown contact type: ${contactType}`);
    }
  }
}

export interface ContactData {
    contactType: ContactType,
    contactInfo?: string,
    icon: IconDefinition
}

export enum ContactType {
    PHONE = 'Telefon',
    EMAIL = 'Email',
    ADDRESS = 'Adres'
}