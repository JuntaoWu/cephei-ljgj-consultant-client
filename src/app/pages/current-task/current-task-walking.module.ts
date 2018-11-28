import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskWalking } from './current-task-walking';
// import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskWalking,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    CurrentTaskWalking,
  ],
  providers: [
    // CurrentTaskService
  ]
})
export class CurrentTaskWalkingModule { }
