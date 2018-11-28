import { CurrentTaskPage } from "./current-task";
import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";

//TaskType.Fixing == 0

@Component({
    selector: 'page-current-task',
    templateUrl: 'current-task.html'
})
export class CurrentTaskFixing extends CurrentTaskPage {

    loadTaskDetail(task: any) {
        this.loading && this.loading.dismiss();
    }

    refreshTaskStatus() {
        this.stepArray.forEach((m, index) => {
            m.completed = m.indexId < this.currentStep;
            m.canproceed = index == 0 || m.indexId <= this.currentStep;
        });
        this.currentTask.completed = this.currentStep >= 8;
    }

    get progressUrl() {
        let url = this.totalStep == 7
        ? `url('assets/img/img_one_center_${Math.max(1, this.currentStep)}.png')`
        : `url('assets/img/img_two_center_${this.currentStep + 1}.png')`;
        return url;
    }

    navigateToTaskDetail(index) {
        if(environment.clientType == 'Client' && !this.stepArray[index].canproceed) {
            this.toast("不能进行该步骤");
            return;
        }
        super.navigateToTaskDetail(index);
        
    }

}