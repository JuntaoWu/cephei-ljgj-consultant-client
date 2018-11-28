import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import { AreaStore } from '../../services/providers';

@Injectable()
export class AddTaskService {

    constructor(private api: Api,private area:AreaStore) {

    }

    AddWork(phone: string, userId: string,title:string,address:string,lat:string,lng:string,isprospect:string,orderType:string,listcount:string) {
        return this.api.post('AddWork', {
            phone:phone,
            userid:userId,
            title:title,
            address:address,
            lat:lat,
            lng:lng,
            areaid:this.area.areaId,
            isprospect:isprospect,
            ordertype:orderType,
            listcount:listcount
        });
    }
}