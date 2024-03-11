import { Component, OnDestroy, OnInit } from '@angular/core';
import { FancyButtonComponent, ButtonSize } from '../../shared/components/fancy-button/fancy-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject, catchError, takeUntil, throwError } from 'rxjs';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: {ngSkipHydration: 'true'},
  providers: [AlertService]
})
export class ContactComponent implements OnInit, OnDestroy{
  buttonSize = ButtonSize
  contactForm: FormGroup;
  destroy$ = new Subject<void>();

  emailFocused: boolean = false
  subjectFocused: boolean = false
  messageFocused: boolean = false

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.alertService.showSuccess('This is a success message');
    this.alertService.showSuccess('This is a success message');
  }

  onSubmit() {
      const formData = this.contactForm.value;
      const url = 'https://formspree.io/f/xleqnqwz';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(url, formData, { headers })
        .pipe(
          takeUntil(this.destroy$),
          catchError((error: HttpErrorResponse) => {
            return throwError(() => error)
          })
        ).subscribe(
          (response) => {
            console.log('Response:', response);
            // Tutaj możesz obsłużyć odpowiedź serwera, np. wyświetlić komunikat potwierdzający wysłanie formularza
          },
          (error) => {
            console.error('Error:', error);
            // Obsługa błędu, np. wyświetlenie komunikatu o niepowodzeniu wysłania formularza
          }
        );
  }

  showAlert() {
    this.alertService.showSuccess('This is a success message');
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }
}
