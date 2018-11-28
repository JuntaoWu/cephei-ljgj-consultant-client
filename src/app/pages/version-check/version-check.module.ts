import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { VersionCheckPage } from './version-check.page';
import { SharedModule } from '../../shared/shared.module';
import { VersionCheckService } from './version-check.service';

@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: VersionCheckPage
      }
    ]),
    SharedModule
  ],
  declarations: [
    VersionCheckPage,
  ],
  providers: [
    VersionCheckService
  ]
})
export class VersionCheckPageModule { }
