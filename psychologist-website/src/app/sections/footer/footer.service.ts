import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FooterService {
  constructor(private firestore: Firestore) {}

  getContactData(): Observable<ContactData[]> {
    const contactDocRef = doc(this.firestore, 'collection/contact')
    return docData(contactDocRef).pipe(map((response: any) => response.contactData as ContactData[]))
  }
}

export interface ContactData {
    contactType: ContactType,
    contactInfo?: string
}

export enum ContactType {
    PHONE = 'Telefon',
    EMAIL = 'Email',
    ADDRESS = 'Adres'
}