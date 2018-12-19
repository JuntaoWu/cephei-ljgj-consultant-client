import { OrderStatus } from "app/types/order-status.enum";

export class OrderItem {
    orderNo: string;
    orderName: string;
    orderStatus: OrderStatus;
    customerName: string;
    customerPhone: string;
    orderTime: string;
    orderAddress: string;
}
