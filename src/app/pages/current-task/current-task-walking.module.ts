import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskWalking } from './current-task-walking';
import { SharedModule } from '../../shared/shared.module';
// import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskWalking,
  ],
  imports: [
    SharedModule,
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
