import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RecordingDialogPage } from './recording-dialog';

@NgModule({
  declarations: [
    RecordingDialogPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    RecordingDialogPage
  ]
})
export class RecordingDialogPageModule { }
