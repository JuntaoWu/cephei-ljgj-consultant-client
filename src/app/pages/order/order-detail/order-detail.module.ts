import { NgModule } from '@angular/core';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailPage } from './order-detail.page';
import { DetailPage } from './detail/detail.page';
import { BacklogPage } from './backlog/backlog.page';
import { PaymentPage } from './payment/payment.page';
import { DetailModalPage } from './detail/detail-modal/detail-modal.page';

@NgModule({
  declarations: [OrderDetailPage, DetailPage, BacklogPage, PaymentPage,DetailModalPage],
  imports: [
    SharedModule,
    OrderDetailRoutingModule
  ],
  entryComponents:[DetailModalPage]
})
export class OrderDetailModule { }
