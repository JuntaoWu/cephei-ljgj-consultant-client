import { Injectable } from '@angular/core';
import { Api } from 'app/services/api/api';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Payment } from './payment.model';


@Injectable({
    providedIn: 'root'
})
export class PaymentService{
    constructor(public api: Api) {

    }

    get(orderId): Observable<Payment>{
        return this.api.get(`order/${orderId}/getOrderFunds`).pipe(
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
                return throwError("获取预付款失败");
            })
        );
    }
    createOrderTotalAmount(orderId,orderAmount){
        return this.api.post(`order/editOrderAmount`,{orderId:orderId,orderAmount:orderAmount}).pipe(
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
                return throwError("更新订单总金额失败");
            })
        )
    }
    createOrderWork(orderId,fundItemAmount:number,fundItemType:number){
        return this.api.post(`order/${orderId}/createOrderFundItem`, { orderId:orderId,fundItemAmount:fundItemAmount,fundItemType:fundItemType}).pipe(
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
                return throwError("新增预付款失败");
            })
        );
    } 
}