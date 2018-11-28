import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { UserListPage } from './user-list';
import { SharedModule } from '../../shared/shared.module';
import {UserManagerService} from './user-manager.service';
@NgModule({
  declarations: [
    UserListPage,
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule
  ],
  exports: [    
    UserListPage  
  ],
  providers: [
    UserManagerService
  ]
})
export class UserListPageModule { }
