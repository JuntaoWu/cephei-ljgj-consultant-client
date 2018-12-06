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
import { OrderStatus } from '../../types/order-status.enum';
import { OrderPaymentStatus } from '../../types/order-payment-status.enum';

declare var wx: any;
declare var WeixinJSBridge: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    public wxOpenId: string;  // bind to UI for testing.
    public orderItems: any[];

    public isWxBrowser: boolean;
    public showPaidAlreadyButton: boolean;

    constructor(public navCtrl: NavController,
        private settings: Settings,
        private toast: ToastController,
        private userService: UserService, private loadingCtrl: LoadingController, private area: AreaStore) {

        const agent = navigator.userAgent.toLowerCase();
        this.isWxBrowser = /MicroMessenger/i.test(agent);
    }

    async ngOnInit() {
        await this.refresh();
    }

    public async refresh() {
        this.showPaidAlreadyButton = false;
        this.userService.getMyOrderItems().subscribe(
            async (res) => {
                this.orderItems = res.map(item => {
                    item.orderThumbUrl = item.orderThumbUrl || "/assets/imgs/default.png";
                    item.shouldBePaid = +item.orderAmount && (item.paymentStatus == OrderPaymentStatus.Waiting || item.paymentStatus == OrderPaymentStatus.Exception);
                    return item;
                });
            }
        );
    }

    public async weChatPay(orderItem) {
        if (this.isWxBrowser) {
            // 公众号支付
            await this.wxBrowserPay(orderItem);
        }
        else {
            // H5支付
            await this.browserPay(orderItem);
        }
    }

    private async browserPay(orderItem: any) {
        // For testing purpose only. Fill in wxOpenId to call wxBrowserPay in normal browser.
        if (this.wxOpenId) {
            return await this.wxBrowserPay(orderItem);
        }

        const orderId = orderItem.orderid;

        this.userService.createUnifiedOrder(orderId, null, 'MWEB').subscribe(
            async (res) => {
                if (!res || res.code !== 0) {
                    return console.error(res.message);
                }
                if (res.mweb_url) {
                    window.open(res.mweb_url);
                    // after that display a button to query current page again once payment completed.
                    this.showPaidAlreadyButton = true;
                    return;
                }
            },
            (err) => {
                console.error(err);
                this.toast.create({
                    message: err.error && err.error.message || err.message,
                    duration: 2000,
                    translucent: true,
                }).then(toast => toast.present());
            }
        );

    }

    private async wxBrowserPay(orderItem: any) {
        // ***Step 1. Get wx.config params for WeChat JS-SDK via POST /api/payments/createWxConfig { url }
        const configParams = await this.userService.createWxConfig({
            url: encodeURIComponent(location.href.split("#")[0])
        }).toPromise();

        /** received configParams:
         * 
         *  appId: configParams.appId, // 必填，公众号的唯一标识
            timestamp: configParams.timestamp, // 必填，生成签名的时间戳
            nonceStr: configParams.nonceStr, // 必填，生成签名的随机串
            signature: configParams.signature,// 必填，签名
            signType: configParams.signType,
         */
        wx.config({
            ...configParams,
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        });

        // ***Step 2. Prepare openId & orderId.
        const orderId = orderItem.orderid;
        const storedWxOpenId = await this.settings.getValue('wxOpenId');
        const wxOpenId = this.wxOpenId || storedWxOpenId;

        // ***Step 3. createUnifiedOrder via POST /api/payments/createUnifiedOrder { orderId, wxOpenId }.
        this.userService.createUnifiedOrder(orderId, wxOpenId, "JSAPI").subscribe(
            async (res) => {
                if (!res || res.code !== 0) {
                    return console.error(res.message);
                }

                // Step 4. Use WeixinJSBridge Internal Object.
                if (WeixinJSBridge) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', res.data,
                        (wxRes) => {
                            if (wxRes.err_msg == "get_brand_wcpay_request:ok") {
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                // wxRes.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                // todo: check success
                                this.toast.create({
                                    message: "支付完成",
                                    duration: 2000,
                                    position: "middle",
                                    translucent: true,
                                }).then(toast => toast.present());
                                // Now we can refresh the order status via getMyOrders/getOrderDetail api.
                                setTimeout(this.refresh, 2000);
                            }
                        });
                }
                else {
                    // Step 4. Or use chooseWXPay via WeChat JS-SDK.
                    // todo: Not tested yet.
                    const wxRes = await this.chooseWXPay(res.data);
                    setTimeout(this.refresh, 2000);
                }
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

    // api in JS-SDK
    private async chooseWXPay(paymentParams) {
        return new Promise(async (resolve, reject) => {
            /** received paymentParams:
             *  
             *  appId: paymentParams.appId,
                timeStamp: paymentParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: paymentParams.nonceStr, // 支付签名随机串，不长于 32 位
                package: paymentParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: paymentParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: paymentParams.paySign, // 支付签名
             */
            wx.chooseWXPay({
                // ***Note: if we're using chooseWXPay api, 'timeStamp' in paymentParams might need to be changed to 'timestamp'.
                ...paymentParams,
                success: function (res) {
                    // 支付成功后的回调函数
                    this.toast.create({
                        message: JSON.stringify(res),
                        duration: 2000,
                        translucent: true,
                    }).then(toast => toast.present());
                    return resolve(res);
                },
                error: function (err) {
                    console.error(err);
                    alert(err);
                },
            });
        });
    }

}
