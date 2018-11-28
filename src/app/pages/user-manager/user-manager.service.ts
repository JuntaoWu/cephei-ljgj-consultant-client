import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import { environment } from '../../../environments/environment';

@Injectable()
export class UserManagerService {

    constructor(private api: Api) {

    }

    getAreaList(phone: string, userId: string) {
        return this.api.post('GetAreaList', {
            phone: phone,
            userid: userId
        });
    }
    
    getUserList(phone:string,areaId:string){
        return this.api.post('GetUserList', {
            phone: phone,
            area_id: areaId
        });
    }

    getUserInfo(phone:string,userId:string){
        return this.api.post(environment.GetUserInfo, {
            phone: phone,
            userid: userId
        });
    }
    UpdateUserInfo(phone:string,areaId:string,userPhone:string,username:string,pwd:string){
        return this.api.post('AddUser',{
            phone:phone,
            area_id:areaId,
            user_phone:userPhone,
            user_name:username,
            user_pwd:pwd,
           
        })
    }
}