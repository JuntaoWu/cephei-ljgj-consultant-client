import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AreaListPage } from './area-list';
import { AreaListService } from './area-list.service';

@NgModule({
  declarations: [
    AreaListPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    AreaListPage
  ],
  providers: [
    AreaListService
  ]
})
export class AreaListPageModule { }
