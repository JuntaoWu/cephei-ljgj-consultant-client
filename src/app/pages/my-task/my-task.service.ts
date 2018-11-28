import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";

@Injectable()
export class MyTaskService {

    constructor(private api: Api) {

    }

    getMyWorkList(phone: string, userId: string,orderType:string) {
        return this.api.post('MyWorkList', {
            phone: phone,
            userid: userId,
            ordertype:orderType
        });
    }
}