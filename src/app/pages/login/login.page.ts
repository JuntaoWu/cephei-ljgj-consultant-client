import { Component, OnInit } from '@angular/core';
import { NavController, App } from '@ionic/angular';
import { UserService, ToastService, AreaStore, Settings } from '../../services/providers';
import { LoadingController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
    public logon = {
        phoneNo: '',
        verificationCode: '',
        rememberMe: true,
    };

    public client: boolean = false;
    public management: boolean = false;
    public versionLabel: string;

    public getVerificationCodeText: string = "获取验证码";
    private timeLimit: number = 60;
    public hasSentVerificationCode: boolean = false;

    public isWxBrowser: boolean = false;
    public isLoggedIn: boolean = false;

    constructor(public navCtrl: NavController,
        public router: Router,
        private userService: UserService,
        private loadingCtrl: LoadingController,
        private area: AreaStore,
        public appCtrl: App,
        private settings: Settings,
        private toastService: ToastService) {

    }

    async ngOnInit() {
        const agent = navigator.userAgent.toLowerCase();
        this.isWxBrowser = /MicroMessenger/i.test(agent);

        if (environment.clientType == "Client") {
            this.client = true;
        } else {
            this.management = true;
        }

        this.versionLabel = `当前版本${environment.version}`;

        this.logon.rememberMe = await this.settings.getValue('rememberMe');
        if (this.logon.rememberMe) {
            this.logon.phoneNo = await this.settings.getValue('phone');
        }

        let token = localStorage.getItem("token");

        this.isLoggedIn = !!token;
    }

    async authorize() {
        // first clear storedWxOpenId.
        this.settings.setValue('wxOpenId', '');
        location.href = `${environment.endpoint}/wxuser/authorize?state=${location.pathname}`;
    }

    async login() {
        let loading = await this.loadingCtrl.create({
            message: "登录中..."
        });
        await loading.present();

        this.userService.login({
            "phoneNo": this.logon.phoneNo,
            "verificationCode": this.logon.verificationCode,
        }).subscribe(
            (res) => {
                loading.dismiss();
                if (!res || res.code !== 0) {
                    this.toastService.show(res && res.message || "登录失败");
                    return;
                }

                if (res.data) {
                    this.settings.setValue('phone', this.logon.phoneNo);

                    this.settings.setValue('rememberMe', this.logon.rememberMe);
                }

                this.navigateToHome();
            },
            (err) => {
                loading.dismiss();
                this.toastService.show(err.error && err.error.message || err.message);
            });
    }

    async getVerificationCode() {
        if (this.hasSentVerificationCode) {
            return;
        }
        this.timeLimit = 60;
        this.hasSentVerificationCode = true;

        this.userService.getVerificationCode(this.logon.phoneNo).subscribe((res: any) => {
            if (!res || res.code !== 0) {
                this.toastService.show(res.message || "获取验证码失败");
                return;
            }
        });

        let getVerificationCodeTick = () => {
            if (--this.timeLimit <= 0) {
                this.timeLimit = 60;
                this.hasSentVerificationCode = false;
                this.getVerificationCodeText = "获取验证码";
                return;
            }
            this.getVerificationCodeText = `${this.timeLimit}s`;
            setTimeout(getVerificationCodeTick, 1000);
        };

        getVerificationCodeTick();
    }

    navigateToHome() {
        this.navCtrl.navigateForward(['/tabs']);
    }

}
