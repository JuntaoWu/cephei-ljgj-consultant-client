import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import { environment } from '../../../environments/environment';

@Injectable()
export class UserCenterService {

    constructor(private api: Api) {

    }
    getUserInfo(phone:string,userId:string){
        return this.api.post(environment.GetUserInfo, {
            phone: phone,
            userid: userId
        });
    }
    UpdateUserInfo(phone:string,userId:string,pwd:string,username:string,fullname:string,areaid:string){
        return this.api.post(environment.UpdateUserInfo,{
            phone:phone,
            userId:userId,
            pwd:pwd,
            username:username,
            fullname:fullname,
            areaid:areaid
        })
    }
}