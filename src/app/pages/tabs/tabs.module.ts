import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../../shared/shared.module';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { HeroPageModule } from '../hero/hero.module';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule.forChild(),
    TabsPageRoutingModule,
    HeroPageModule,
  ],
  declarations: [
    TabsPage
  ]
})
export class TabsPageModule { }