import { OrderPaymentStatus } from "../../../../types/order-payment-status.enum";
import { OrderPaymentType } from "../../../../types/order-payment-type.enum";

export class Payment{
    public orderId:string;

    public paymentType:OrderPaymentType;

    public amount:number;

    public paymentStatus:OrderPaymentStatus;
}