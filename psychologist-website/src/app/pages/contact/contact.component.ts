import { Component, OnDestroy, OnInit } from '@angular/core';
import { FancyButtonComponent, ButtonSize } from '../../shared/components/fancy-button/fancy-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { AlertService } from '../../shared/components/alert/alert.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, HttpClientModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class ContactComponent implements OnInit, OnDestroy {
  buttonSize = ButtonSize
  contactForm: FormGroup
  destroy$ = new Subject<void>()

  emailFocused: boolean = false
  subjectFocused: boolean = false
  messageFocused: boolean = false

  constructor(
    private alertService: AlertService,
    protected authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$
      .pipe(
        tap(user => {
          if (user) {
            this.contactForm.patchValue({
              email: user.email
            })
          }
        }),
        takeUntil(this.destroy$),
      ).subscribe()
  }

  onSubmit() {
    const formData = this.contactForm.value
    const url = 'https://formspree.io/f/xleqnqwz'
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post(url, formData, { headers })
      .pipe(
        tap(() => {
          this.alertService.showSuccess('Wiadomość została wysłana pomyślnie.')
          this.contactForm.reset()
        }),
        takeUntil(this.destroy$),
        catchError((error: HttpErrorResponse) => {
          this.alertService.showErrorMessage('Podczas wysyłania wiadomości wystąpił błąd. Spróbuj ponownie później.')
          return throwError(() => error)
        })
      ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
