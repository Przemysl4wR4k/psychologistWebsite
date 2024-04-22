import { Component, Inject, OnDestroy, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  title = 'psychologist-website'
  constructor(
    private router: Router) {}
    private destroy$ = new Subject<void>()

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd && typeof window !== 'undefined') {
        window.scrollTo(0, 0)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
