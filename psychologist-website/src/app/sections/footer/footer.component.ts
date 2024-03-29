import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FooterItemComponent } from './footer-item/footer-item.component';
import { Observable, Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { ContactData, ContactType, FooterService } from './footer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/components/alert/alert.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule, FooterItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent implements OnInit, OnDestroy {
  faLocationDot = faLocationDot
  faPhone = faPhone
  faPaperPlane = faPaperPlane
  contactTypes = ContactType
  contactInfo$!: Observable<any>
  destroy$ = new Subject<void>()
  
  constructor(private alertService: AlertService, private footerService: FooterService) {
  }

  ngOnInit(): void {
    this.footerService.getContactData()
      .pipe(
        tap((contactData: ContactData[]) => console.log(contactData)),
        catchError((err: HttpErrorResponse) => {
          this.alertService.showErrorMessage(err.error.message)
          return throwError(() => err)
        }),
        takeUntil(this.destroy$)
      ).subscribe()
  }

  ngOnDestroy(): void {
      this.destroy$.next()
      this.destroy$.complete()
  }
}
