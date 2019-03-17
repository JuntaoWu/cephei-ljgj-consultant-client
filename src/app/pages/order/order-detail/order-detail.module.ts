import { NgModule } from '@angular/core';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailPage } from './order-detail.page';
import { DetailPage } from './detail/detail.page';
import { BacklogPage } from './backlog/backlog.page';
import { PaymentPage } from './payment/payment.page';
import { DetailModalPage } from './detail/detail-modal/detail-modal.page';
import { PaymentModalPage } from './payment/payment-modal/payment-modal.page';
import { BacklogModalComponent } from './backlog/backlog-modal/backlog-modal.component';
import { PaymentTotalModalPage } from './payment/payment-total-modal/payment-total-modal.page';
import {PaymentQurcodePage} from './payment/payment-qrcode/payment-qrcode.page';

@NgModule({
  declarations: [OrderDetailPage, DetailPage, BacklogPage, PaymentPage,DetailModalPage,PaymentModalPage, BacklogModalComponent,PaymentTotalModalPage,PaymentQurcodePage],
  imports: [
    SharedModule,
    OrderDetailRoutingModule
  ],
  entryComponents:[DetailModalPage,PaymentModalPage, BacklogModalComponent,PaymentTotalModalPage,PaymentQurcodePage]
})
export class OrderDetailModule { }
