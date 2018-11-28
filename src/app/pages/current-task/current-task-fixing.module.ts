import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskFixing } from './current-task-fixing';
import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskFixing,
  ],
  imports: [
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
