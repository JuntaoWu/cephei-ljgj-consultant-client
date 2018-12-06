import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Settings } from '../settings/settings';
import { environment } from '../../../environments/environment';
import { share, map } from 'rxjs/operators';


@Injectable()
export class UserService {
    phoneNo: string;
    user: any;

    constructor(public api: Api, private settings: Settings) {
        settings.getValue('phoneNo').then(phoneNo => {
            this.phoneNo = phoneNo;
        });

        settings.getValue('user').then(user => {
            this.user = user;
        });
    }

    getVerificationCode(phoneNo: string) {
        return this.api.post('auth/getVerificationCode', {
            phoneNo: phoneNo
        });
    }

    login(accountInfo: any) {
        this.phoneNo = accountInfo && accountInfo.phoneNo;

        let seq = this.api.post(environment.clientType == 'Management' ? 'auth/login' : 'auth/login', accountInfo).pipe(share());

        seq.subscribe(
            (res: any) => {
                // If the API returned a successful response, mark the user as logged in
                if (res && res.code === 0 && res.data) {
                    this.loggedIn(res.data);
                }
            },
            (err) => {
                console.error('ERROR', err && err.message || err);
            });

        return seq;
    }

    getMyOrderItems() {
        return this.api.get(`order/getMyOrders`);
    }

    createUnifiedOrder(orderId: string, wxOpenId: string, tradeType: "JSAPI" | "MWEB" = "JSAPI") {
        return this.api.post(`payment/createUnifiedOrder`, {
            orderId: orderId,
            wxOpenId: wxOpenId,
            tradeType: tradeType
        });
    }

    createWxConfig(data) {
        return this.api.post(`payment/createWxConfig`, data).pipe(map(res => {
            return res.data;
        }));
    }

    getWxSignature(data) {
        return this.api.post(`payment/getWxSignature`, data).pipe(map(res => {
            return res.data;
        }));
    }

    logout() {
        this.user = null;
    }

    loggedIn(user) {
        this.user = user;
        this.settings.setValue('user', this.user);
        if (this.user && this.user.token) {
            localStorage.setItem('token', this.user.token);
        }
    }
}
