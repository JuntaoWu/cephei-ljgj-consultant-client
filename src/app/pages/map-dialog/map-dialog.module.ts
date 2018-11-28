import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { BaiduMapModule } from 'angular2-baidu-map';
import { MapDialogPage } from './map-dialog';

@NgModule({
  declarations: [
    MapDialogPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    BaiduMapModule.forRoot({ak: 'wYo99CqY1FUGGeNug9FyQ2GjUSICtw2F'})
  ],
  exports: [
    MapDialogPage
  ]
})
export class MapDialogPageModule { }
