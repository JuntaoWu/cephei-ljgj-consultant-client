import { Component, OnInit } from '@angular/core';
import { Payment } from './payment.model';
import { OrderPaymentType } from '../../../../types/order-payment-type.enum';
import { OrderPaymentStatus } from '../../../../types/order-payment-status.enum';
import { PopoverController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PaymentModalPage } from './payment-modal/payment-modal.page';
import { PaymentService } from './payment.service';
import { PaymentTotalModalPage } from './payment-total-modal/payment-total-modal.page';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  public orderId: string;
  public totalAmount: Number;
  constructor(public service: PaymentService, public route: ActivatedRoute, public modalController: ModalController) { }
  public payment: Payment;
  ngOnInit() {
    this.route.parent.paramMap.subscribe(p => {
      this.orderId = p.get("orderId");
    });

    this.service.get(this.orderId).subscribe(res => {
      this.payment = res;
    })
  }

  generateColor(item): string {
    let result = '';
    if (item) {
      switch (+item.fundItemStatus) {
        case OrderPaymentStatus.Initializing:
          result = 'status-red-color';
          break;
        case OrderPaymentStatus.Waiting:
          result = 'status-red-color';
          break;
        case OrderPaymentStatus.Completed:
          result = 'status-green-color';
          break;
        case OrderPaymentStatus.Closed:
          result = 'status-red-color';
          break;
        case OrderPaymentStatus.Exception:
          result = 'status-red-color';
          break;
      }
    }
    return result;
  }

  async paymentCreatePrompt() {
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      componentProps: { 'orderId': this.orderId }
    });
    modal.onDidDismiss().then((result: any) => {
      this.service.get(this.orderId).subscribe(res => {
        this.payment = res;
      });
    })
    return await modal.present();
  }

  async paymentCreateTotalAmount() {

    if (this.payment.orderPaymentStatus != OrderPaymentStatus.Completed && this.payment.orderPaymentStatus != OrderPaymentStatus.Closed) {
      const modal = await this.modalController.create({
        component: PaymentTotalModalPage,
        componentProps: { 'orderId': this.orderId }
      });
      modal.onDidDismiss().then((result: any) => {
        this.service.get(this.orderId).subscribe(res => {
          this.payment = res;
        });
      });
      return await modal.present();
    }
    else {
      return null;
    }
  }

  showTotalAmountDetail() {
    if (this.payment.orderPaymentStatus != OrderPaymentStatus.Completed && this.payment.orderPaymentStatus != OrderPaymentStatus.Closed) {
      return true;
    } else {
      false;
    }
  }

}
