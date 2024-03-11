import { Component } from '@angular/core';
import { AlertService } from './alert.service';
 
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  staticAlerts = AlertService.staticAlerts

  constructor(public alertService: AlertService) {
  
  }
}
