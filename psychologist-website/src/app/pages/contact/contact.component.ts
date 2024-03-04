import { Component } from '@angular/core';
import { FancyButtonComponent, ButtonSize } from '../../shared/components/fancy-button/fancy-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, HttpClientModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  host: {ngSkipHydration: 'true'}
})
export class ContactComponent {
  buttonSize = ButtonSize
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
      const formData = this.contactForm.value;
      const url = 'https://formspree.io/f/xleqnqwz';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      this.http.post(url, formData, { headers })
        .subscribe(
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

  emailFocused: boolean = false
  subjectFocused: boolean = false
  messageFocused: boolean = false
}
