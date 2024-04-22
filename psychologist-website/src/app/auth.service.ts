import { Injectable } from "@angular/core";
import { Auth, authState, signOut, signInWithPopup, GoogleAuthProvider } from "@angular/fire/auth";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { Observable, from, of, switchMap, map, tap, catchError } from "rxjs";
import { User } from "./shared/user";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>

    constructor(private auth: Auth, private firestore: Firestore) {
        this.user$ = authState(this.auth).pipe(
          switchMap(user => {
            if (user) {
              const docRef = doc(this.firestore, `admins/${user.uid}`)
              return docData(docRef).pipe(
                map(adminData => ({
                  uid: user.uid,
                  email: user.email!,
                  isAdmin: !!adminData
                }))
              )
            } else {
              return of(null);
            }
          })
        )
    }

    loginWithGoogle(): Observable<any> {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
          tap(result => console.log('Zalogowano poprawnie', result.user)),
          catchError(error => {
            console.error('Błąd logowania', error)
            return of(null)
          })
        )
    }

    logout(): Observable<void> {
        return from(signOut(this.auth)).pipe(
          tap(() => console.log('Wylogowano poprawnie'))
        )
    }
}