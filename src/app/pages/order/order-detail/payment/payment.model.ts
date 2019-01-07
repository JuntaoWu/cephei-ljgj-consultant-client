import { OrderPaymentStatus } from "../../../../types/order-payment-status.enum";
import { OrderPaymentType } from "../../../../types/order-payment-type.enum";

export class FundItem{
    public orderId:string;
    public fundItemId:string;
    public fundItemType:OrderPaymentType;
    public fundItemAmount:number;
    public  fundItemStatus:string;
}

export class Payment{
    public orderId:string;

    public orderAmount:number;

    public orderPaymentStatus:OrderPaymentStatus;

    public fundItems: FundItem[];
}