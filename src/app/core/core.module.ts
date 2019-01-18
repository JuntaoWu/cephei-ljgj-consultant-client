import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { httpInterceptorProviders } from './interceptors';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading-interceptor';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
  ],
  providers: [
    httpInterceptorProviders
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
