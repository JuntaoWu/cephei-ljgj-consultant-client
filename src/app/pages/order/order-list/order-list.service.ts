import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api';
// import { Api } from '../../../services/api/api';
import { environment } from '../../../../environments/environment';
import { share, map, catchError } from 'rxjs/operators';
import { OrderStatus } from '../../../types/order-status.enum';
import { of, Observable } from 'rxjs';
import { OrderItem } from './order.item';


@Injectable()
export class OrderListService {

    constructor(public api: Api) {

    }

    getMyOrderItems(status: OrderStatus = OrderStatus.All, skip = 0, limit = 10): Observable<OrderItem[]> {
        return this.api.get(`order/?status=${status}&skip=${skip}&limit=${limit}`).pipe(
            map(res => {
                console.log(res.message);
                if (res.code !== 0) {
                    console.error(res.message);
                    throw new Error(res.message);
                }
                return (res.data as any[]).map(item => {
                    return {
                        orderId: item._id,
                        orderNo: item.orderid,
                        orderName: item.orderContent,
                        orderStatus: item.orderStatus,
                        customerName: item.contactsUserName,
                        customerPhone: item.createdBy,
                        orderTime: item.createdAt,
                        orderAddress: item.orderAddress
                    };
                });
            }),
            catchError(err => {
                return of([]);
            })
        );
    }
}
