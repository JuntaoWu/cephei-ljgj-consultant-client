import { CurrentTaskPage } from "./current-task";
import { Component } from "@angular/core";
import { TaskStore } from "../../services/providers";
import { DetailPage, SecurityCheckListPage } from "../pages";

//TaskType.Monitoring == 2

@Component({
    selector: 'page-current-task',
    templateUrl: 'current-task.html'
})
export class CurrentTaskMonitoring extends CurrentTaskPage {

    private securityCheckList: any;

    async loadTaskDetail(task: any) {
        this.api.getTaskDetail(this.userService.phoneNo,
            this.currentTask && this.currentTask.work_id,
            this.taskType).subscribe((resp: any) => {
                this.loading && this.loading.dismiss();
                // resp && console.log(JSON.stringify(resp.workdetail));

                if (resp.workdetail && resp.workdetail.length) {
                    resp.workdetail.forEach(i => {
                        this.stepArray.forEach(step => {
                            if (step.indexId == i.indexid) {
                                step.completed = true;
                            }
                            else if (step.indexId instanceof Array && step.indexId.filter(function(item){ return item == i.indexid}).length) {
                                step.completed = true;
                                step.childSteps[i.indexid].completed = true;
                            }
                        });
                    });

                    this.securityCheckList = resp.workdetail;
                }
            },
            (error) => {
                this.loading.dismiss();
                this.toast(error.message);
            });
    }

    refreshTaskStatus() {
        this.stepArray.forEach((m, index) => {
            //m.completed = index < this.currentStep;  //wrong way for this tasktype
            m.canproceed = true;
        });
        this.currentTask.completed = this.currentTask.status == 1;
    }

    get progressUrl() {
        let url = "";
        if (this.currentTask && this.currentTask.status == 1) {
            url = `url('assets/img/work_finish.png')`;
        }
        else if (this.currentStep > 0 && this.currentTask.status == 0) {
            url = `url('assets/img/work_doing.png')`;
        }
        else {
            url = `url('assets/img/work_bf_doing.png')`;
        }
        return url;
    }

    manualComplete() {

        if (!this.currentTask || !this.currentTask.work_id) {
            this.toastService.show("未提供work_id");
            return;
        }

        this.api.saveWork(this.userService.phoneNo, this.currentTask.work_id, 1).subscribe(
            (resp: any) => {
                this.toast(resp.msg);
                if (resp.status == "true") {
                    this.loadCurrentTask().then(() => {
                        this.loadTaskDetail(this.currentTask);
                    });
                }
            },
            error => {
                this.toast(error.message);
            });
    }

    public navigateToTaskDetail(index) {

        if(this.stepArray[index].childSteps) {
            throw "not implemented";
            // this.navCtrl.push(SecurityCheckListPage, {
            //     workId: this.currentTask.work_id,
            //     taskType: this.taskType,
            //     stepCompleted: this.stepArray[index].completed,
            //     taskCompleted: this.currentTask.completed,
            //     name: this.stepArray[index].name,
            //     step: this.stepArray[index],
            //     indexId: this.stepArray[index].indexId,
            //     securityCheckList: this.securityCheckList,
            // });
        }
        else {
            throw "not implemented";
            // this.navCtrl.push(DetailPage, {
            //     workId: this.currentTask.work_id,
            //     process:  this.stepArray[index].indexId,
            //     taskType: this.taskType,
            //     stepCompleted: this.stepArray[index].completed,
            //     taskCompleted: this.currentTask.completed,
            //     name: this.stepArray[index].name,
            //     step: this.stepArray[index],
            //     indexId: this.stepArray[index].indexId,
            // });
        }
    }
}