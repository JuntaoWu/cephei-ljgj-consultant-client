import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../../shared/shared.module';
import { TabsPageRoutingModule } from './tabs.router.module';

import { HeroPageModule } from '../hero/hero.module';
import { OrderModule } from '../order/order.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
    TabsPageRoutingModule,
    OrderModule,
    HeroPageModule,
  ],
  declarations: [
    TabsPage
  ]
})
export class TabsPageModule { }