import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: Alert[] = []
  timeout = 6000

  constructor() { 
    console.log('AlertService created')
  }

  private showAlert(message: string, type: AlertType, timeout: number) {
    this.alerts.push({ message, type, timeout })
  }

  showSuccess(message: string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Success, timeout);
  }
  
  showErrorMessage(message: string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Danger, timeout);
  }
}


enum AlertType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}
  
export interface Alert {
    type: AlertType
    message: string
    timeout: number
}