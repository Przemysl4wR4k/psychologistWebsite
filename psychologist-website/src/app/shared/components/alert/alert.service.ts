
export class AlertService {
  alerts: Alert[] = [];
  constructor() { }
  addAlert(alert: Alert) {
    this.alerts.push(alert);
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }
}


export enum AlertType {
    Success = 'success',
    Info = 'info',
    Warning = 'warning',
    Danger = 'danger'
}
  
interface Alert {
    type: AlertType
    message: string
    timeout: number
}