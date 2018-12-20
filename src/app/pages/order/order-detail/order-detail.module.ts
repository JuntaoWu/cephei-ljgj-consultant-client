import { NgModule } from '@angular/core';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailPage } from './order-detail.page';
import { DetailPage } from './detail/detail.page';
import { LogPage } from './log/log.page';
import { PaymentPage } from './payment/payment.page';

@NgModule({
  declarations: [OrderDetailPage, DetailPage, LogPage, PaymentPage],
  imports: [
    SharedModule,
    OrderDetailRoutingModule
  ]
})
export class OrderDetailModule { }
