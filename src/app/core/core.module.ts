import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { httpInterceptorProviders } from './interceptors';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { MatProgressSpinnerModule } from '@angular/material';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraMock } from 'app/mocks/CameraMock';
import { isPlatform } from '@ionic/core';
import { environment } from 'environments/environment';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';

const cameraProvider = {
  provide: Camera,
  useClass: environment.production ? Camera : CameraMock
};

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SpinnerComponent,
  ],
  providers: [
    httpInterceptorProviders,
    cameraProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  // public static forRoot(): ModuleWithProviders {
  //   return <ModuleWithProviders>{
  //     ngModule: CoreModule,
  //     providers: [
  //       httpInterceptorProviders
  //     ]
  //   };
  // }
}
