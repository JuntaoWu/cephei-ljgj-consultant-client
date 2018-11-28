import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { UserAreaListPage } from './user-area-list';
import { SharedModule } from '../../shared/shared.module';
import {UserManagerService} from './user-manager.service';
@NgModule({
  declarations: [
    UserAreaListPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [    
    UserAreaListPage  
  ],
  providers: [
    UserManagerService
  ]
})
export class UserAreaListPageModule { }
