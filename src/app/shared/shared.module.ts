import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        GeolocationBarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [GeolocationBarComponent, CommonModule, FormsModule, IonicModule]
})
export class SharedModule { }
