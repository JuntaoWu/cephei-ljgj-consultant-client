import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AddTaskPage } from './add-task';
import { AddTaskService } from './add-task.service';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AddTaskPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [
    AddTaskPage
  ],
  providers: [
    AddTaskService
  ]
})
export class AddTaskPageModule { }
