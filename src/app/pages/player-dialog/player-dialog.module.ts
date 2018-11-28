import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { PlayerDialogPage } from './player-dialog';

@NgModule({
  declarations: [
    PlayerDialogPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    PlayerDialogPage
  ]
})
export class PlayerDialogPageModule { }
