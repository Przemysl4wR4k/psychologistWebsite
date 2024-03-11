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
  title = 'psychologist-website';
  // Znany lekarz widget
  constructor(
    private renderer: Renderer2,
    private router: Router,
    @Inject(DOCUMENT) private document: Document) {}
    private destroy$ = new Subject<void>()

  ngOnInit(): void {
    this.loadScript()
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0)
      }
    })
  }

  loadScript() {
    const script = this.renderer.createElement('script')
    script.type = 'text/javascript'
    script.src = '//platform.docplanner.com/js/widget.js'
    this.renderer.appendChild(this.document.head, script)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
