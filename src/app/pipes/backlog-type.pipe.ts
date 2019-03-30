import { Pipe, PipeTransform } from '@angular/core';
import { BacklogType } from 'app/pages/order/order-detail/backlog/backlog.model';

@Pipe({
    name: 'backlogType'
})
export class BacklogTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let result = "";
        switch (+value) {
            case BacklogType.ConfirmOrder:
                result = "订单确认";
                break;
            case BacklogType.ContactUser:
                result = "联系用户";
                break;
            case BacklogType.VisitUser:
                result = "上门查看";
                break;
            case BacklogType.Reviewed:
                result = "审核完成";
                break;
            case BacklogType.Preparing:
                result = "准备施工";
                break;
            case BacklogType.InProgress:
                result = "正在施工";
                break;
            case BacklogType.Completed:
                result = "施工完成";
                break;
            case BacklogType.Canceled:
                result = "订单终止";
                break;
            case BacklogType.Others:
                result = "其他";
                break;
        }
        return result;
    }

}
