import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { UserCenterPage } from './user-center';
import { SharedModule } from '../../shared/shared.module';
import { UserCenterService } from './user-center.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserCenterPage,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [    
    UserCenterPage
  ],
  providers: [
    UserCenterService
  ]
})
export class UserCenterPageModule { }
