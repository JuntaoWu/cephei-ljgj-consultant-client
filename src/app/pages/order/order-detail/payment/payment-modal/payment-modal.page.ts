import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
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
    constructor(private navParams: NavParams, public popoverController: PopoverController) {

    }
    ngOnInit() {
        var iosstyle = document.querySelector('.popover-content.sc-ion-popover-ios');
        iosstyle['style'].width = '80%';
        iosstyle['left'] = '35px';
        iosstyle['top'] = '200.275px';

        this.payitem = new Payment();
        this.payitem.orderId =  this.navParams && this.navParams.get('orderId');
        this.orderpaymenttypes.push(OrderPaymentType.ConstructionCost);
        this.orderpaymenttypes.push(OrderPaymentType.MaterialCost);
        this.orderpaymenttypes.push(OrderPaymentType.OtherCost);
    }


    async confim() {
        this.payitem.paymentStatus = OrderPaymentStatus.Initializing;
        await this.popoverController.dismiss(this.payitem);
    }

    async cancel() {
        await this.popoverController.dismiss();
    }
}