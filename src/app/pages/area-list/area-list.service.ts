import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import * as moment from "moment";

@Injectable()
export class AreaListService {

    constructor(private api: Api) {

    }

    getAreaList(phone: string, userId: string) {
        return this.api.post('GetAreaList', {
            phone: phone,
            userid: userId
        });
    }

    getWorkList(phone: string, areaidlist: string, starttime: string, endtime: string, ordertype: string) {

        endtime = endtime || moment().format("YYYY-MM-DD");
        starttime = starttime || moment().subtract(7, "days").format("YYYY-MM-DD");

        console.log(`Get worklist from ${starttime} to ${endtime}`);

        return this.api.post('GetWorkList', {
            phone: phone,
            areaidlist: areaidlist,
            starttime: `${starttime} 00:00`,
            endtime: `${endtime} 23:59`,
            ordertype: ordertype
        });
    }
}