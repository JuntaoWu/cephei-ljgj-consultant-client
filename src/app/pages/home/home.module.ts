import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    SharedModule,
    TranslateModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
  ]
})
export class HomePageModule { }
