import { OrderStatus } from "app/types/order-status.enum";
import {OrderPaymentStatus} from "app/types/order-payment-status.enum";

export class OrderBaseInfo{
    orderContent:string;
    orderTime:string;
    orderStatus:OrderStatus;
    orderAddress:string;
    contactsUserName:string;
    phoneNo:string;
}

export class OrderAmountInfo{
    orderAmount:number;
    paymentStatus:OrderPaymentStatus
}

export class OrderContact{
    cmgUrl:string;
}

export class OrderWork{
    orderworkid:string;
    orderWork:string;
    createTime:string;
}

export class OrderDetail {
    orderid: string;
    orderBaseInfo: OrderBaseInfo;
    orderAmountInfo:OrderAmountInfo;
    orderContract: OrderContact[];
    groupOrderInfo:string;
    orderWorkList:OrderWork[];
}