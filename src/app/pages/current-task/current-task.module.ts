import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { CurrentTaskPage } from './current-task';
import { SharedModule } from '../../shared/shared.module';
// import { CurrentTaskService } from './current-task.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CurrentTaskPage,
  ],
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    CurrentTaskPage,
  ],
  providers: [
    // CurrentTaskService
  ]
})
export class CurrentTaskPageModule { }
