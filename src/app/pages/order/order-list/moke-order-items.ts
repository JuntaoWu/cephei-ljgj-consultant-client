import { OrderItem } from '../order.item';
import { OrderStatus } from 'app/types/order-status.enum';

export const OrderItems: OrderItem[] = [
  { orderName: '阳台贴砖', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '厨房防水', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '书房翻新', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '软装改造', orderStatus: OrderStatus.Initializing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '系统升级', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '水电改造', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
  { orderName: '打孔安装', orderStatus: OrderStatus.Preparing, orderNo: 'WXX201805081352232524', customerName: '罗先生', customerPhone: '15680680502', orderTime: '2018-05-09', orderAddress: '成都市武侯区人民南路四段三号' },
];
