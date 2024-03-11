import { Observable, BehaviorSubject } from 'rxjs';

export class AlertService {
  basicAlerts: Alert[] = []
  static staticAlerts: Alert[] = []
  private readonly alerts: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([])
  readonly alerts$: Observable<Alert[]> = this.alerts.asObservable()
  timeout = 6000

  constructor() { 
    console.log('AlertService created')
  }
  
  getAlerts() {
    return this.alerts.getValue();
  }

  private showAlert(message: string, type: AlertType, timeout: number) {
    const newAlerts = [...this.alerts.getValue(), { message, type, timeout }]
    this.alerts.next(newAlerts);
    // console.log(this.alerts.getValue())
    AlertService.staticAlerts.push({ message, type, timeout })
    this.basicAlerts.push({ message, type, timeout })
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