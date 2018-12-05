import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderStatusPipe } from '../pipes/order-status.pipe';
import { OrderPaymentStatusPipe } from '../pipes/order-payment-status.pipe';

@NgModule({
    declarations: [
        GeolocationBarComponent,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [GeolocationBarComponent, CommonModule, FormsModule, IonicModule, OrderStatusPipe, OrderPaymentStatusPipe,]
})
export class SharedModule { }
