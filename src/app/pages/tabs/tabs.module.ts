import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../../shared/shared.module';
import { TabsPageRoutingModule } from './tabs.router.module';
import { HomePageModule } from '../home/home.module';
import { HeroPageModule } from '../hero/hero.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
    TabsPageRoutingModule,
    HomePageModule,
    HeroPageModule,
  ],
  declarations: [
    TabsPage
  ]
})
export class TabsPageModule { }