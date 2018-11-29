import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskFixing } from './current-task-fixing';
import { CurrentTaskService } from './current-task.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    CurrentTaskFixing,
  ],
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    CurrentTaskFixing,
  ],
  providers: [
    CurrentTaskService
  ]
})
export class CurrentTaskFixingModule { }
