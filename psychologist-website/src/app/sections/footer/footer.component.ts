import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterItemComponent } from './footer-item/footer-item.component';
import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { ContactData, FooterService } from './footer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/components/alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FooterItemComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent implements OnInit, OnDestroy {
  contactData!: ContactData[]

  destroy$ = new Subject<void>()
  
  constructor(private alertService: AlertService, private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.getContactData()
      .pipe(
        tap((contactData: ContactData[]) => this.contactData = contactData),
        catchError((err: HttpErrorResponse | string) => {
          this.alertService.showErrorMessage(err)
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
