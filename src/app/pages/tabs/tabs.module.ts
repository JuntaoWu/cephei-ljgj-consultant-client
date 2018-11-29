import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsPageModule { }