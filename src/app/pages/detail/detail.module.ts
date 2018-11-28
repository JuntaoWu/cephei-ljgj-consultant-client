import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail';
import { TaskDetailService } from './detail.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    DetailPage
  ],
  providers: [
    TaskDetailService
  ]
})
export class DetailPageModule { }
