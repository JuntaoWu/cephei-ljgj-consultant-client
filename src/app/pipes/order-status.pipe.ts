import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../types/order-status.enum';

@Pipe({
    name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

    transform(value: OrderStatus, args?: any): any {
        let result = "";
        switch (+value) {
            case OrderStatus.Initializing:
                result = "审核中";
                break;
            case OrderStatus.Preparing:
                result = "准备中";
                break;
            case OrderStatus.InProgress:
                result = "施工中";
                break;
            case OrderStatus.Completed:
                result = "已完成";
                break;
            case OrderStatus.Canceled:
                result = "已取消";
                break;
        }
        return result;
    }

}
