import { Component, Inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './sections/footer/footer.component';
import { NavbarComponent } from './sections/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterOutlet, HomeComponent, AboutComponent],
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
