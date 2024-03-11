import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AlertModule } from "./shared/components/alert/alert.module";
import { AppComponent } from "./app.component";
import { LayoutComponent } from "./pages/layout/layout.component";


@NgModule({
  imports: [    
    // BrowserModule,
    CommonModule,
    AlertModule
  ],
  bootstrap: [
    LayoutComponent
  ]
})
export class AppModule { }