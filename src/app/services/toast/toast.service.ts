
import { Injectable } from "@angular/core";
import { ToastController, Platform } from "@ionic/angular";
import { Toast } from "@ionic-native/toast/ngx";
import { environment } from "../../../environments/environment";

@Injectable()
export class ToastService {

    constructor(private toastCtrl: ToastController, private toast: Toast, private platform: Platform) {

    }

    async show(message: string, duration: number = 1500, position: 'bottom' | 'top' | 'middle' = 'bottom') {
        if (this.platform.is('cordova') && environment.production) {
            this.toast.showWithOptions({
                message: message,
                duration: duration,
                position: position,
                addPixelsY: position == 'bottom' ? -160 : 0
            }).subscribe();
        }
        else {
            let toast = await this.toastCtrl.create({
                message: message,
                duration: duration,
                position: position
            });
            toast.present();
        }
    }
}