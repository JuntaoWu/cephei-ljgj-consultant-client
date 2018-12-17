import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { OrderPageRoutingModule } from './order.router.module';
import { OrderPage } from './order.page';
import { OrderListPage } from './order-list/order-list.page';
import { OrderDetailPage } from './order-detail/order-detail.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    OrderPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    OrderPage,
    OrderListPage,
    OrderDetailPage
  ]
})
export class OrderModule { }