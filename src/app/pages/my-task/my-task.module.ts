import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MyTaskPage } from './my-task';
import { MyTaskService } from './my-task.service';

@NgModule({
  declarations: [
    MyTaskPage,
  ],
  imports: [
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
