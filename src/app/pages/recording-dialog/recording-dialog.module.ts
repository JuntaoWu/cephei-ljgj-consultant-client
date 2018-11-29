import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RecordingDialogPage } from './recording-dialog';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    RecordingDialogPage,
  ],
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    RecordingDialogPage
  ]
})
export class RecordingDialogPageModule { }
