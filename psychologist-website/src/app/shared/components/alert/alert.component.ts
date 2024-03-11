import { Component } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  standalone: true,
  imports: [AlertModule, CommonModule],
  providers: [AlertService]
})

export class AlertComponent {
  staticAlerts = AlertService.staticAlerts

  constructor(public alertService: AlertService) {
  
  }
}

