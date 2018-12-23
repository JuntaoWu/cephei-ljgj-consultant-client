import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderStatusPipe } from '../pipes/order-status.pipe';
import { OrderPaymentStatusPipe } from '../pipes/order-payment-status.pipe';
import { MatTabsModule, MatStepperModule } from '@angular/material';
import { BacklogTypePipe } from 'app/pipes/backlog-type.pipe';

@NgModule({
    declarations: [
        GeolocationBarComponent,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        BacklogTypePipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatTabsModule,
        MatStepperModule,
    ],
    exports: [
        GeolocationBarComponent,
        CommonModule,
        FormsModule,
        IonicModule,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        BacklogTypePipe,
        MatTabsModule,
        MatStepperModule
    ]
})
export class SharedModule { }
