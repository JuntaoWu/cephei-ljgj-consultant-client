import { NgModule } from '@angular/core';
import { GeolocationBarComponent } from './geolocation-bar/geolocation-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderStatusPipe } from '../pipes/order-status.pipe';
import { OrderPaymentStatusPipe } from '../pipes/order-payment-status.pipe';
import { MatTabsModule, MatStepperModule, MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { BacklogTypePipe } from 'app/pipes/backlog-type.pipe';
import { orderPaymentTypePipe } from 'app/pipes/order-payment-type.pipe';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ImageBarComponent } from './image-bar/image-bar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        GeolocationBarComponent,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        orderPaymentTypePipe,
        BacklogTypePipe,
        ImageUploadComponent,
        ImageBarComponent,
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
        CommonModule,
        FormsModule,
        IonicModule,
        MatTabsModule,
        MatStepperModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        GeolocationBarComponent,
        ImageUploadComponent,
        ImageBarComponent,
        OrderStatusPipe,
        OrderPaymentStatusPipe,
        orderPaymentTypePipe,
        BacklogTypePipe,
    ]
})
export class SharedModule { }
