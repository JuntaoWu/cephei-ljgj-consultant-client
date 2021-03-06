import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FundItem } from '../payment.model';
import { PaymentService } from '../payment.service';
import { environment } from 'environments/environment';


@Component({
    selector: 'modal-page',
    templateUrl: 'payment-qrcode.page.html',
    styleUrls: ['./payment-qrcode.page.scss'],
})
export class PaymentQurcodePage implements OnInit {

    // "values" passed in componentProps
    @Input() orderId: string;
    @Input() fundItemId:string;
    @Input() fundItemAmount: number;
    
    public amount: string;
    
    public imageurl: string;
    public activeHref: string;
    constructor(public modalController: ModalController, public service: PaymentService, public toastController: ToastController) {

    }
    ngOnInit() {
        this.amount = (+this.fundItemAmount).toFixed(2);
        console.log('orderId: ' + this.orderId);
        console.log('fundItemId: ' + this.fundItemId);
        this.activeHref = `/tabs/root/order/${this.orderId}/payment`;
        this.service.getQrcodeImage(this.fundItemId).subscribe(res=>{
            //console.log('res:' + res);
            let token = localStorage.getItem("token")
            this.imageurl = `${environment.host}/api/order/getQRCode/?code_url=${encodeURIComponent(res)}&token=${token}`;
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