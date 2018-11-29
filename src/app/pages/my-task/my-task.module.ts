import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MyTaskPage } from './my-task';
import { MyTaskService } from './my-task.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MyTaskPage,
  ],
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    MyTaskPage
  ],
  providers: [
    MyTaskService
  ]
})
export class MyTaskPageModule { }
