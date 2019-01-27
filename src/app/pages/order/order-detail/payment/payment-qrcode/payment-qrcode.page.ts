import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FundItem } from '../payment.model';
import { PaymentService } from '../payment.service';


@Component({
    selector: 'modal-page',
    templateUrl: 'payment-qrcode.page.html',
    styleUrls: ['./payment-qrcode.page.scss'],
})
export class PaymentQurcodePage implements OnInit {

    // "values" passed in componentProps
    @Input() orderId: string;
    @Input() fundItemId:string;
    
    public imageurl: string;
    public activeHref: string;
    constructor(public modalController: ModalController, public service: PaymentService, public toastController: ToastController) {

    }
    ngOnInit() {
        console.log('orderId: ' + this.orderId);
        console.log('fundItemId: ' + this.fundItemId);
        this.activeHref = `/tabs/root/order/${this.orderId}/payment`;
        this.service.getQrcodeImage(this.fundItemId).subscribe(res=>{
            //console.log('res:' + res);
            let token = localStorage.getItem("token")
            this.imageurl = `/api/order/getQRCode/?code_url=${encodeURIComponent(res)}&token=${token}`;
        },
        error => {
          this.showErrorMessage(error)
        });
    }


    async confim() {
        //this.payitem.paymentStatus = OrderPaymentStatus.Initializing;
        /*this.service.createOrderWork(this.payitem.orderId, this.payitem.fundItemAmount, this.payitem.fundItemType).subscribe(
            res => {
            console.log('payment-modal res: ' + JSON.stringify(res));
            this.modalController.dismiss();
        },
        error => {
          this.showErrorMessage(error)
        });*/
       

    }

    async cancel() {
        await this.modalController.dismiss(null, 'cancel');
    }

    showErrorMessage(error) {
        this.toastController.create({
            message: error,
            duration: 1500
        }).then(totaset => {
            totaset.present();
        })
    }
}