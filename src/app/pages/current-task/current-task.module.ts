import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskPage } from './current-task';
import { SharedModule } from '../../shared/shared.module';
// import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule,
  ],
  exports: [
    CurrentTaskPage,
  ],
  providers: [
    // CurrentTaskService
  ]
})
export class CurrentTaskPageModule { }
