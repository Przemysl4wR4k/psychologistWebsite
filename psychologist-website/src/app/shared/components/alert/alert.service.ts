import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: Alert[] = []
  private timeout = 6000

  constructor() { 
  }

  private showAlert(message: HttpErrorResponse | string, type: AlertType, timeout: number) {
    this.alerts.push({ message, type, timeout })
  }

  showSuccess(message: string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Success, timeout)
  }
  
  showErrorMessage(message: HttpErrorResponse | string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Danger, timeout)
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
    message: HttpErrorResponse | string
    timeout: number
}