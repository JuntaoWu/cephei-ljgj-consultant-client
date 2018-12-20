import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { OrderListPage } from './order-list/order-list.page';
import { OrderService } from './order.service';

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
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }