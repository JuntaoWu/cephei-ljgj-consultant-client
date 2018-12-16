import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../../shared/shared.module';
import { TabsPageRoutingModule } from './tabs.router.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule { }