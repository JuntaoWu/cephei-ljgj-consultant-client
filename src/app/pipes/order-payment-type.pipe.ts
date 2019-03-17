import { Pipe, PipeTransform } from '@angular/core';
import {OrderPaymentType} from '../types/order-payment-type.enum'

@Pipe({
    name: 'orderPaymentType'
})
export class orderPaymentTypePipe implements PipeTransform {

    transform(value: OrderPaymentType, args?: any): any {
        let result = "";
        switch (+value) {
            case OrderPaymentType.ConstructionCost:
                result = "预付款";
                break;
            case OrderPaymentType.MaterialCost:
                result = "材料费";
                break;
            case OrderPaymentType.OtherCost:
                result = "其他";
                break;
        }
        return result;
    }

}
