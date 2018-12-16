import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeroPage } from './hero.page';
import { SharedModule } from '../../../app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HeroPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeroPage]
})
export class HeroPageModule {}
