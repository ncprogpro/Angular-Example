import { EventEmitter, Injectable } from '@angular/core';
import { AlertModel } from '@core/models/Alerts/alertModel';
import { AlertTypeEnum } from '@core/models/Alerts/alertTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertEmitter: EventEmitter<AlertModel> = new EventEmitter<AlertModel>();

  constructor() { }

  getAlertEmitter(): EventEmitter<AlertModel> {
    return this.alertEmitter;
  }

  sendCreateAlert(message: string) {
    let alert: AlertModel = new AlertModel(AlertTypeEnum.create, message);
    this.alertEmitter.emit(alert);
  }

  sendUpdateAlert(message: string) {
    let alert: AlertModel = new AlertModel(AlertTypeEnum.update, message);
    this.alertEmitter.emit(alert);
  }

  sendDeleteAlert(message: string) {
    let alert: AlertModel = new AlertModel(AlertTypeEnum.delete, message);
    this.alertEmitter.emit(alert);
  }

  normalAlert(message: string) {
    let alert: AlertModel = new AlertModel(AlertTypeEnum.normal, message);
    this.alertEmitter.emit(alert);
  }
}
