import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        GeolocationBarComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
    ],
    exports: [GeolocationBarComponent, CommonModule, FormsModule]
})
export class SharedModule { }
