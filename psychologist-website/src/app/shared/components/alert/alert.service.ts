export class AlertService {
  readonly alerts: Alert[] = []
  timeout = 5000

  constructor() { }

  private showAlert(message: string, type: AlertType, timeout: number) {
    this.alerts.push({ message, type, timeout })
  }

  showSuccess(message: string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Success, timeout)
  }
  
  showErrorMessage(message: string, timeout: number = this.timeout) {
    this.showAlert(message, AlertType.Danger, timeout)
  }
}


enum AlertType {
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