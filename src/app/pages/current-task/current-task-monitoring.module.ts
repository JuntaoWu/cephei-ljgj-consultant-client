import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskMonitoring } from './current-task-monitoring';
import { SharedModule } from '../../shared/shared.module';
// import { CurrentTaskService } from './current-task.service';

@NgModule({
  declarations: [
    CurrentTaskMonitoring,
  ],
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    CurrentTaskMonitoring,
  ],
  providers: [
    // CurrentTaskService
  ]
})
export class CurrentTaskMonitoringModule { }
