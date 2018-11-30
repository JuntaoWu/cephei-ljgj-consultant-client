import { Component, ViewChild } from '@angular/core';
import { Config, Platform, Nav } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TranslateService } from '@ngx-translate/core';

import { Settings } from './services/providers';
import { OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { ɵparseCookieValue as parseCookieValue } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    private wxOpenId: string;
    private phone: string;
    private startUrl: string;

    constructor(private translate: TranslateService,
        private router: Router,
        private config: Config, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private settings: Settings) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.initTranslate();
    }

    async ngOnInit() {
        await this.settings.load();

        if (this.isWxBrowser()) {
            this.wxOpenId = await this.settings.getValue('wxOpenId');
            if (!this.wxOpenId) {
                const wxOpenId = parseCookieValue(document.cookie, "wxOpenId");

                if (wxOpenId) {
                    this.wxOpenId = wxOpenId;
                    this.settings.setValue('wxOpenId', wxOpenId);
                }
                else {
                    location.href = `${environment.endpoint}/wxuser/authorize?state=${location.pathname}`;
                    return;
                }
            }
        }

        const user = await this.settings.getValue('user');
        this.phone = await this.settings.getValue('phone');

        if (user && location.pathname && location.pathname != "/") {
            return;
        }

        if (user) {
            this.startUrl = 'home';
        }
        else {
            this.startUrl = this.phone ? 'version-check' : 'login';
        }
        this.navigateToHome();
    }

    isWxBrowser() {
        const agent = navigator.userAgent.toLowerCase();
        return /MicroMessenger/i.test(agent);
    }

    initTranslate() {
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('cn');

        if (this.translate.getBrowserLang() !== undefined) {
            this.translate.use(this.translate.getBrowserLang());
        } else {
            this.translate.use('cn'); // Set your language here
        }

        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
            this.config.set('backButtonText', values.BACK_BUTTON_TEXT);
        });
    }

    navigateToHome() {
        this.router.navigate([this.startUrl]);
    }
}
