
import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import { TaskType } from "../../shared/task-type";

@Injectable()
export class CurrentTaskService {

    constructor(private api: Api) {

    }

    getCurrentTask(phone: string, userId: string, taskType: TaskType, workId: string = "", areaId: any = []) {
        var areaids;
        if(areaId && areaId instanceof Array){
            areaids = areaId.map(area => area.departmentid || area);
        }else{
            areaids =  areaId;
        }
        return this.api.post('IndexWork', {
            phone: phone,
            userid: userId,
            ordertype: taskType,
            workid: workId,
            areaidlist: areaids
        });
    }

    getTaskDetail(phone: string, workId: string, taskType: TaskType) {
        return this.api.post('GetWorkDetailsList', {
            phone: phone,
            work_id: workId,
            ordertype: taskType
        });
    }

    saveWork(phone: string, workId: string, status: number) {
        return this.api.post('SaveWork', {
            phone: phone,
            workid: workId,
            status: status,
        });
    }

}