import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderStatusPipe } from '../pipes/order-status.pipe';
import { OrderPaymentStatusPipe } from '../pipes/order-payment-status.pipe';
import { MatTabsModule, MatStepperModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { BacklogTypePipe } from 'app/pipes/backlog-type.pipe';
import { orderPaymentTypePipe } from 'app/pipes/order-payment-type.pipe';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

@NgModule({
    declarations: [
        GeolocationBarComponent,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        orderPaymentTypePipe,
        BacklogTypePipe,
        ImageUploaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatTabsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule
    ],
    exports: [
        GeolocationBarComponent,
        ImageUploaderComponent,
        CommonModule,
        FormsModule,
        IonicModule,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        orderPaymentTypePipe,
        BacklogTypePipe,
        MatTabsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule
    ]
})
export class SharedModule { }
