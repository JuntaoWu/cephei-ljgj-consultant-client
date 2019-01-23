import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HeroPage } from '../hero/hero.page';

import { OrderPage } from '../order/order.page';

const routes: Routes = [
    {
        path: 'root',
        component: TabsPage,
        children: [
            { path: 'order', loadChildren: "../order/order.module#OrderModule" },
            { path: 'hero', component: HeroPage },
            { path: '', redirectTo: '/tabs/root/order', pathMatch: 'full' }
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/root/order',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
