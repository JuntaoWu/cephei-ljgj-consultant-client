import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ]),
  ],
  declarations: [
    LoginPage,
  ],
  entryComponents: [LoginPage],
  providers: []
})
export class LoginPageModule { }
