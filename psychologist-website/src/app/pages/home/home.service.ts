import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  constructor(private firestore: Firestore) {}

  getQuote(): Observable<Quote> {
    const contactDocRef = doc(this.firestore, 'collection/quote')
    return docData(contactDocRef).pipe(map((response: any) => response as Quote))
  }
}

export interface Quote {
    quote: string,
    author: string
}