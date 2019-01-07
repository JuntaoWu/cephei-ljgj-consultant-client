import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { PaymentService } from '../payment.service';


@Component({
    selector: 'total-modal-page',
    templateUrl: 'payment-total-modal.page.html',
    styleUrls: ['./payment-total-modal.page.scss'],
})
export class PaymentTotalModalPage implements OnInit {
    public orderId;
    public activeHref: string;
    public totalAmount:Number;
    constructor(private navParams: NavParams, public modalController: ModalController,public service:PaymentService,public toastController: ToastController) {
        
    }
    ngOnInit() {
        this.orderId =  this.navParams && this.navParams.get('orderId');
        this.activeHref = `/tabs/root/(order:order/${this.orderId}/payment)`;
        this.service.get(this.orderId).subscribe(res => {
            this.totalAmount = res.orderAmount;
          })
      
    }


    async confim() {
        this.service.createOrderTotalAmount(this.orderId,this.totalAmount).subscribe(res=>{
            console.log('payment-modal res: ' + JSON.stringify(res));
            this.modalController.dismiss();
        },error=>this.showErrorMessage);
       
    }

    async cancel() {
        await this.modalController.dismiss();
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