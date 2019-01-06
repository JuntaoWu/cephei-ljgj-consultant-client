import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api';
import { share, map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Backlog } from './backlog.model';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class BacklogService {

    constructor(public api: Api, private toastController: ToastController) {

    }

    get(orderId): Observable<Backlog[]> {
        return this.api.get(`order/${orderId}/getOrderDiarys`).pipe(
            map(res => {
                console.log(res.message);
                if (res.code !== 0) {
                    console.error(res.message);
                    throw new Error(res.message);
                }

                if (!res.data) {
                    console.error("Invalid data response.");
                    throw new Error("Invalid data response.");
                }

                return res.data;
            }),
            catchError((err) => {
                console.error(err);
                return throwError("获取日志失败");
            })
        );
    }

    create(orderId, backlog: Backlog): Observable<Backlog> {
        return this.api.post(`order/createOrderDiary`, backlog).pipe(
            map(res => {
                console.log(res.message);
                if (res.code !== 0) {
                    console.error(res.message);
                    throw new Error(res.message);
                }

                if (!res.data) {
                    console.error("Invalid data response.");
                    throw new Error("Invalid data response.");
                }

                return res.data;
            }),
            catchError((err) => {
                console.error(err);
                return throwError("创建日志失败");
            })
        );
    }
}

