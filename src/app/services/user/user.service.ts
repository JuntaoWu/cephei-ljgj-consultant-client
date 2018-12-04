

import { Injectable } from '@angular/core';

import { Api } from '../api/api';
import { Settings } from '../settings/settings';
import { environment } from '../../../environments/environment';
import { share, map } from 'rxjs/operators';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   code: 0,
 *   message: 'ok',
 *   data: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
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

    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
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

    createUnifiedOrder(wxOpenId: string, orderId: string) {
        return this.api.post(`payments/createUnifiedOrder`, {
            wxOpenId: wxOpenId,
            orderId: orderId,
        });
    }

    createWxConfig(data) {
        return this.api.post(`payments/createWxConfig`, data).pipe(map(res => {
            return res.data;
        }));
    }

    getWxSignature(data) {
        return this.api.post(`payments/getWxSignature`, data).pipe(map(res => {
            return res.data;
        }));
    }

    /**
     * Log the user out, which forgets the session
     */
    logout() {
        this.user = null;
    }

    /**
     * Process a login/signup response to store user data
     */
    loggedIn(user) {
        this.user = user;
        this.settings.setValue('user', this.user);
        if (this.user && this.user.token) {
            localStorage.setItem('token', this.user.token);
        }
    }
}
