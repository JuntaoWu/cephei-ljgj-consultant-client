import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskSwitching } from './current-task-switching';
// import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskSwitching,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    CurrentTaskSwitching,
  ],
  providers: [
    // CurrentTaskService
  ]
})
export class CurrentTaskSwitchingModule { }
