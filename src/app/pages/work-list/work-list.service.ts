import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";

@Injectable()
export class WorkListService {

    constructor(private api: Api) {

    }

    getAreaList(phone: string, starttime: string,endtime:string,ordertype:string,areaId:string) {
        return this.api.post('GetWorkList', {
            phone: phone,
            areaidlist: areaId,
            starttime: starttime,
            endtime:endtime,
            ordertype:ordertype
        });
    }
}