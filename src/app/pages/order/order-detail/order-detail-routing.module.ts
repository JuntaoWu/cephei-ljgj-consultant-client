import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailPage } from './order-detail.page';
import { DetailPage } from './detail/detail.page';
import { LogPage } from './log/log.page';
import { PaymentPage } from './payment/payment.page';

const routes: Routes = [
  {
    path: '',
    component: OrderDetailPage,
    children: [
      {
        path: '',
        redirectTo: 'detail'
      },
      {
        path: 'detail',
        component: DetailPage,
        // loadChildren: './detail/detail.module#DetailPageModule'
      },
      {
        path: 'log',
        component: LogPage,
        // loadChildren: './log/log.module#LogPageModule'
      },
      {
        path: 'payment',
        component: PaymentPage,
        // loadChildren: './payment/payment.module#PaymentPageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule { }
