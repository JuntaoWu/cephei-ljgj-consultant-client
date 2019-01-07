import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ModalController, ToastController } from '@ionic/angular';
import { OrderPaymentType } from '../../../../../types/order-payment-type.enum';
import { FundItem } from '../payment.model';
import { OrderPaymentStatus } from '../../../../../types/order-payment-status.enum';
import { PaymentService } from '../payment.service';


@Component({
    selector: 'modal-page',
    templateUrl: 'payment-modal.page.html',
    styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
    public orderpaymenttypes: OrderPaymentType[] = [];
    public payitem:FundItem;
    public activeHref: string;
    constructor(private navParams: NavParams, public modalController: ModalController,public service:PaymentService,public toastController: ToastController) {
        
    }
    ngOnInit() {
        this.payitem = new FundItem();
        this.payitem.orderId =  this.navParams && this.navParams.get('orderId');
        this.activeHref = `/tabs/root/(order:order/${this.payitem.orderId}/payment)`;
        this.orderpaymenttypes.push(OrderPaymentType.ConstructionCost);
        this.orderpaymenttypes.push(OrderPaymentType.MaterialCost);
        this.orderpaymenttypes.push(OrderPaymentType.OtherCost);
    }


    async confim() {
        //this.payitem.paymentStatus = OrderPaymentStatus.Initializing;
        this.service.createOrderWork(this.payitem.orderId,this.payitem.fundItemAmount,this.payitem.fundItemType).subscribe(res=>{
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