import { Injectable } from '@angular/core';
import { Api } from 'app/services/api/api';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { OrderDetail } from './detail.model';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService{
    constructor(public api: Api) {

    }

    get(orderId): Observable<OrderDetail> {
        return this.api.get(`order/${orderId}`).pipe(
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
    createOrderWork(orderId,workContent:string){
        return this.api.post(`order/appendOrderWorkToOrder`, {orderId:orderId,orderWork:workContent}).pipe(
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
                return throwError("创建施工内容失败");
            })
        );
    }

    updateOrderWork(orderWorkid,orderWorkContent){
        return this.api.post(`order/editOrderWorkToOrder`, {orderWorkid:orderWorkid,orderWork:orderWorkContent}).pipe(
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
                return throwError("更新施工内容失败");
            })
        );
    }
}