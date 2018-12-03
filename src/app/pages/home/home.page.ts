import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TabsPage, UserCenterPage } from "../pages";
import { UserService, Settings } from '../../services/providers';
import { OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { AreaStore } from '../../services/providers';
import { environment } from '../../../environments/environment';
import { Toast } from '@ionic-native/toast/ngx';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

declare var wx: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    private tabsRoot;
    private fixing: any;
    private inspectInspection: any;
    private supervisedCheck: any;
    private switchingOperation: any;
    private result: any;

    public client: boolean = false;
    public management: boolean = false;
    public versionLabel: string;

    public orderId: string;
    public wxOpenId: string;

    constructor(public navCtrl: NavController,
        private settings: Settings,
        private toast: ToastController,
        private userService: UserService, private loadingCtrl: LoadingController, private area: AreaStore) {
        this.tabsRoot = TabsPage;
        this.fixing = { taskType: TaskType.Fixing };
        this.inspectInspection = { taskType: TaskType.Walking };
        this.supervisedCheck = { taskType: TaskType.Monitoring };
        this.switchingOperation = { taskType: TaskType.Switching };
    }

    async ngOnInit() {
        if (environment.clientType == "Client") {
            this.client = true;
        } else {
            this.management = true;
        }

        this.versionLabel = `当前版本${environment.version}`;
    }

    async createUnifiedOrder() {
        const storedWxOpenId = await this.settings.getValue('wxOpenId');
        const wxOpenId = this.wxOpenId || storedWxOpenId;
        const toast = await this.toast.create({
            message: wxOpenId,
            duration: 2000,
            translucent: true,
        });
        toast.present();

        this.userService.createUnifiedOrder(wxOpenId, this.orderId).subscribe(
            (res) => {
                console.log(res);
                if (!res || res.code !== 0) {
                    console.error(res.message);
                    this.toast.create({
                        message: res.error && res.error.message || res.message,
                        duration: 2000,
                        translucent: true,
                    }).then(toast => toast.present());
                    return;
                }
                this.chooseWxPay(res.data);
            },
            (err) => {
                console.error(err);
                this.toast.create({
                    message: err.error && err.error.message || err.message,
                    duration: 2000,
                    translucent: true,
                }).then(toast => toast.present());
            });
    }

    async chooseWxPay(data) {

        if (data.result_code == "SUCCESS" || data.return_code == "SUCCESS") {

            return new Promise(async (resolve, reject) => {
                const timestamp = Math.floor(+new Date() / 1000);
                const nonceStr = _.random(10000000, 99999999, false).toString();
                const configParams = [];
                configParams.push({ key: "appid", value: data.appid });
                configParams.push({ key: "timestamp", value: timestamp });
                configParams.push({ key: "noncestr", value: nonceStr });
                configParams.push({ key: "signtype", value: 'SHA1' });
                configParams.push({ key: "url", value: encodeURIComponent(location.href.split("#")[0]) });
                const configSignature = await this.userService.getSignature({
                    payload: configParams
                }).toPromise();

                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appid, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: configSignature,// 必填，签名
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                });

                // 最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
                const packageStr = `prepay_id=${data.prepay_id}`;
                const paymentParams = [];
                paymentParams.push({ key: "appid", value: data.appid });
                paymentParams.push({ key: "timestamp", value: timestamp });
                paymentParams.push({ key: "noncestr", value: nonceStr });
                paymentParams.push({ key: "package", value: packageStr });
                paymentParams.push({ key: "signtype", value: 'SHA1' });
                paymentParams.push({ key: "url", value: encodeURIComponent(location.href.split("#")[0]) });
                const paymentSignature = await this.userService.getSignature({
                    payload: paymentParams
                }).toPromise();

                wx.chooseWXPay({
                    timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
                    package: `prepay_id=${data.prepay_id}`, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: 'SHA1', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: paymentSignature, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        resolve(res);
                    }
                });
            });
        }
        else {
            this.toast.create({
                message: "Create Unified Order failed.",
                duration: 2000,
                translucent: true,
            }).then(toast => toast.present());
        }
    }

    navigateToUserCenter() {
        this.navCtrl.navigateForward(UserCenterPage);
    }

}
