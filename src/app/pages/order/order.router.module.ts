import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderPage } from './order.page';
import { OrderListPage } from './order-list/order-list.page';
import { OrderDetailPage } from './order-detail/order-detail.page';


const routes: Routes = [
    {
        path: '',
        component: OrderPage,
        children:[
            {   path:'',
                component:OrderListPage,
            }
        ],
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderPageRoutingModule { }