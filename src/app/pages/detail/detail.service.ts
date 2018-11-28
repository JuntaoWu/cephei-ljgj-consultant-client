
import { Injectable } from "@angular/core";
import { Api } from "../../services/api/api";
import { TaskType } from "../../shared/task-type";
import { Observable } from "rxjs";

@Injectable()
export class TaskDetailService {

    constructor(private api: Api) {

    }

    getTaskDetail(phone: string, workId: string, process: number, taskType: TaskType, indexId: any) {
        return this.api.post('GetWorkDetails', {
            phone: phone,
            work_id: workId,
            process: process,
            ordertype: taskType,
            indexid: indexId
        });
    }

    saveTaskDetail(form: any) {
        //return this.api.post('http://localhost:3000/upload', form);
        return this.api.post('SaveWorkDetails', form);
    }

}