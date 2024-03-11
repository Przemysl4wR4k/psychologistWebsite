import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'psychologist-website';
  // Znany lekarz widget
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.loadScript();
  }

  loadScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = '//platform.docplanner.com/js/widget.js';
    this.renderer.appendChild(this.document.head, script);
  }
}
