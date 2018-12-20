import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api';
// import { Api } from '../../../services/api/api';
import { environment } from '../../../../environments/environment';
import { share, map, catchError } from 'rxjs/operators';
import { OrderStatus } from '../../../types/order-status.enum';
import { of, Observable } from 'rxjs';
import { OrderItem } from './order.item';
import { IPaginable } from 'app/types/paginable.interface';


@Injectable()
export class OrderListService {

    constructor(public api: Api) {

    }

    getMyOrderItems(status: OrderStatus = OrderStatus.All, currentPage: number = 1, itemsPerPage: number = 10): Observable<IPaginable<OrderItem>> {
        return this.api.get(`order/?status=${status}&skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`).pipe(
            map(res => {
                console.log(res.message);
                if (res.code !== 0) {
                    console.error(res.message);
                    throw new Error(res.message);
                }

                if(!res.data.items) {
                    console.error("Invalid data response.");
                    throw new Error("Invalid data response.");
                }

                const items = (res.data.items as any[]).map(item => {
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

                return {
                    currentPage: res.data.currentPage,
                    itemsPerPage: res.data.itemsPerPage,
                    totalItems: res.data.totalItems,
                    items: items,
                };
            }),
            catchError((err) => {
                console.error(err);
                return of({
                    items: [],
                });
            })
        );
    }
}
