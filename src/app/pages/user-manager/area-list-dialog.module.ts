import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { AreaListDialogPage } from './area-list-dialog';
import { UserManagerService } from './user-manager.service';

@NgModule({
  declarations: [
    AreaListDialogPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    AreaListDialogPage
  ],
  providers: [
    UserManagerService
  ]
})
export class AreaListDialogPageModule { }
