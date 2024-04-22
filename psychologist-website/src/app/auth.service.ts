import { Injectable } from "@angular/core";
import { Auth, authState, signOut, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "@angular/fire/auth";
import { Firestore, doc, docData } from "@angular/fire/firestore";
import { Observable, from, of, switchMap, map, tap, catchError, EMPTY } from "rxjs";
import { User } from "./shared/user";
import { AlertService } from "./shared/components/alert/alert.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(private alertService: AlertService, private auth: Auth, private firestore: Firestore) {
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
                    return of(null)
                }
            })
        );

        this.handleRedirect();
    }

    loginWithGoogle(): Observable<void> {
        return from(signInWithRedirect(this.auth, new GoogleAuthProvider())).pipe(
            catchError(error => {
                console.error('Błąd logowania', error)
                return EMPTY
            })
        )
    }

    handleRedirect() {
        getRedirectResult(this.auth)
            .then(result => {
                if (result) {
                  this.alertService.showSuccess('Zalogowano poprawnie')
                }
            })
            .catch(() => {
              this.alertService.showErrorMessage('Błąd podczas przetwarzania przekierowania')
            })
    }

    logout(): Observable<void> {
        return from(signOut(this.auth)).pipe(
            tap(() => console.log('Wylogowano poprawnie'))
        )
    }
}