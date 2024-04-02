import { Component, OnDestroy, OnInit } from '@angular/core';
import { FancyButtonComponent } from '../../shared/components/fancy-button/fancy-button.component';
import { RouterLink } from '@angular/router';
import { AlertService } from '../../shared/components/alert/alert.service';
import { HomeService, Quote } from './home.service';
import { Subject, catchError, takeUntil, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FancyButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  quote!: Quote
  destroy$ = new Subject<void>()

  constructor(private alertService: AlertService, protected homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getQuote()
      .pipe(
        tap((quote: Quote) => this.quote = quote),
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

  protected getSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
      return 'spring'
    } else if (month >= 5 && month <= 7) {
      return 'summer'
    } else if (month >= 8 && month <= 10) {
      return 'autumn'
    } 
    return 'winter'
  }
}
