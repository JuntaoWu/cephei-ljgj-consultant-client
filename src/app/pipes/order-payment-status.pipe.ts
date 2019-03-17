import { Pipe, PipeTransform } from '@angular/core';
import { OrderPaymentStatus } from '../types/order-payment-status.enum';

@Pipe({
    name: 'orderPaymentStatus'
})
export class OrderPaymentStatusPipe implements PipeTransform {

    transform(value: OrderPaymentStatus, args?: any): any {
        let result = "";
        switch (+value) {
            case OrderPaymentStatus.Initializing:
                result = "未设置";
                break;
            case OrderPaymentStatus.Waiting:
                result = "未支付";
                break;
            case OrderPaymentStatus.Completed:
                result = "已支付";
                break;
            case OrderPaymentStatus.Closed:
                result = "已关闭";
                break;
            case OrderPaymentStatus.Exception:
                result = "异常";
                break;
        }
        return result;
    }

}
