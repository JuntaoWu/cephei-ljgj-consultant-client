import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, ModalController } from '@ionic/angular';
import { OrderPaymentType } from '../../../../../types/order-payment-type.enum';
import { Payment } from '../payment.model';
import { OrderPaymentStatus } from '../../../../../types/order-payment-status.enum';


@Component({
    selector: 'modal-page',
    templateUrl: 'payment-modal.page.html',
    styleUrls: ['./payment-modal.page.scss'],
})
export class PaymentModalPage implements OnInit {
    public orderpaymenttypes: OrderPaymentType[] = [];
    public payitem:Payment;
    public activeHref: string;
    constructor(private navParams: NavParams, public modalController: ModalController) {
        
    }
    ngOnInit() {
        this.payitem = new Payment();
        this.payitem.orderId =  this.navParams && this.navParams.get('orderId');
        this.activeHref = `/tabs/root/(order:order/${this.payitem.orderId}/payment)`;
        this.orderpaymenttypes.push(OrderPaymentType.ConstructionCost);
        this.orderpaymenttypes.push(OrderPaymentType.MaterialCost);
        this.orderpaymenttypes.push(OrderPaymentType.OtherCost);
    }


    async confim() {
        this.payitem.paymentStatus = OrderPaymentStatus.Initializing;
        await this.modalController.dismiss(this.payitem);
    }

    async cancel() {
        await this.modalController.dismiss();
    }
}