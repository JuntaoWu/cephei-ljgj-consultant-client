import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { UserCenterPage } from './user-center';
import { SharedModule } from '../../shared/shared.module';
import { UserCenterService } from './user-center.service';

@NgModule({
  declarations: [
    UserCenterPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [    
    UserCenterPage
  ],
  providers: [
    UserCenterService
  ]
})
export class UserCenterPageModule { }
