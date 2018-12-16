import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderStatusPipe } from '../pipes/order-status.pipe';
import { OrderPaymentStatusPipe } from '../pipes/order-payment-status.pipe';
import { MatTabsModule } from '@angular/material';

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
        MatTabsModule,
    ],
    exports: [GeolocationBarComponent, CommonModule, FormsModule, IonicModule, OrderStatusPipe, OrderPaymentStatusPipe, MatTabsModule,]
})
export class SharedModule { }
