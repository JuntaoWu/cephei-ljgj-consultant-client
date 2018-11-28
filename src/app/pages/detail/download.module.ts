import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { DownloadPage } from './download';

@NgModule({
  declarations: [
    DownloadPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    DownloadPage
  ]
})
export class DownloadPageModule { }
