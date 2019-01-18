import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Settings, UserService, Api, TaskStore, AreaStore, ToastService } from './services/providers';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { BaiduGeolocation } from '@orz-ionic-lab/baidu-geolocation';
// import { BaiduGeolocationIOS } from '@orz-ionic-lab/baidu-geolocation-ios';
import { HTTP } from '@ionic-native/http/ngx';
import { Media } from '@ionic-native/media/ngx';
import { File as NativeFile } from '@ionic-native/file/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { CurrentTaskService } from './pages/current-task/current-task.service';
import { Animation } from 'angular2-baidu-map';
import { IonicGestureConfig } from './core/ionic-gesture.config';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BacklogTypePipe } from './pipes/backlog-type.pipe';

import { CameraMock } from './mocks/CameraMock';
import { CoreModule } from './core/core.module';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new Settings(storage, {});
}

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot({
            backButtonText: '返回',
            backButtonIcon: 'ios-arrow-back',
            // modalEnter: 'modal-slide-in',
            // modalLeave: 'modal-slide-out',
            tabButtonLayout: 'icon-bottom'
        }),
        IonicStorageModule.forRoot({
            name: '__vosdb',
            driverOrder: ['sqlite', 'websql', 'indexeddb']
        }),
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        Api,
        UserService,
        TaskStore,
        StatusBar,
        SplashScreen,
        {
            provide: Settings,
            useFactory: provideSettings,
            deps: [Storage]
        },
        AreaStore,
        // BaiduGeolocation,
        // BaiduGeolocationIOS,
        // Camera,
        { provide: Camera, useClass: CameraMock },
        ImagePicker,
        PhotoViewer,
        HTTP,
        Media,
        NativeFile,
        AndroidPermissions,
        Toast,
        ToastService,
        PhotoLibrary,
        CurrentTaskService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: IonicGestureConfig
        }
    ]
})
export class AppModule { }
