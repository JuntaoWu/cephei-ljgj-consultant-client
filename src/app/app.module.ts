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
import { IonicGestureConfig } from './core/ionic-gesture.config';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        CoreModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        IonicStorageModule.forRoot({
            name: '__ljgjdb',
            driverOrder: ['sqlite', 'websql', 'indexeddb']
        }),
        AppRoutingModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Api,
        UserService,
        TaskStore,
        {
            provide: Settings,
            useFactory: provideSettings,
            deps: [Storage]
        },
        AreaStore,
        // BaiduGeolocation,
        // BaiduGeolocationIOS,
        // Camera,
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
