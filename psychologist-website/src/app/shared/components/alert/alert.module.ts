import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert.component";
import { AlertModule as BsAlertModule} from "ngx-bootstrap/alert";
import { AlertService } from "./alert.service";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "../../../pages/layout/layout.component";

@NgModule({
  declarations: [AlertComponent],
  imports: [
    CommonModule,
    BsAlertModule.forRoot(),
  ],
  providers: [AlertService],
  bootstrap: [LayoutComponent]
})
export class AlertModule { }