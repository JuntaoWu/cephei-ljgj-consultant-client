import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { PlayerDialogPage } from './player-dialog';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PlayerDialogPage,
  ],
  imports: [
    SharedModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    PlayerDialogPage
  ]
})
export class PlayerDialogPageModule { }
