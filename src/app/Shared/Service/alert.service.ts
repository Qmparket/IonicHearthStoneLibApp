import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class AlertService {

  constructor(public alertController: AlertController) {}

  async presentAlert(message: string, btnMessage: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: [btnMessage]
    });

    await alert.present();
  }
}
