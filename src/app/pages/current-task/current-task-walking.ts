import { CurrentTaskPage } from "./current-task";
import { Component } from "@angular/core";
import { DetailPage, MastListPage } from "../pages";
import { Observable ,  Subscription ,  ReplaySubject ,  BehaviorSubject ,  Subject } from "rxjs";
import { environment } from "../../../environments/environment";

//TaskType.Walking == 1

@Component({
    selector: 'page-current-task',
    templateUrl: 'current-task.html'
})
export class CurrentTaskWalking extends CurrentTaskPage {

    private mastList: any[] = [];
    private fetchDetailObservable: Observable<any>;
    private updateWorkDetailSubscription: Subscription;
    private updateMastListSubscription: Subscription;

    private replay = new Subject<ArrayBuffer>();

    ngOnDestroy(): void {
        // this.updateWorkDetailSubscription && this.updateWorkDetailSubscription.unsubscribe();
        // this.updateMastListSubscription && this.updateMastListSubscription.unsubscribe();
        // this.replay && this.replay.unsubscribe();
        super.ngOnDestroy();
    }

    async loadTaskDetail(task) {

        this.loading && this.loading.dismiss();

        // this.fetchDetailObservable = this.api.getTaskDetail(this.userService._phone,
        //     this.currentTask && this.currentTask.work_id,
        //     this.taskType).shareReplay();

        // this.updateWorkDetailSubscription = this.fetchDetailObservable.subscribe(
        //     (resp: any) => {
        //         this.loading && this.loading.dismiss();
        //         console.log("updateWorkDetailSubscription");
        //         if (resp.workdetail && resp.workdetail.length) {
        //             // resp.workdetail.forEach(i => {
        //             //     this.stepArray[i.indexid - 1].completed = true;
        //             // });
        //             console.log("mastList <= workDetail");
        //             this.mastList = resp.workdetail;
        //         }
        //         else {
        //             this.mastList = [];
        //         }
        //     },
        //     (error) => {
        //         this.loading && this.loading.dismiss();
        //         this.toast(error.message);
        //     });
    }

    refreshTaskStatus() {
        this.currentTask.findcount = parseInt(this.currentTask.findcount) || 0;
        this.currentTask.listcount = parseInt(this.currentTask.listcount) || 0;
        
        this.stepArray.forEach((m, index) => {
            m.completed = index == (this.totalStep - 1)
                ? this.currentTask.findcount >= this.currentTask.listcount
                : m.indexId < this.currentStep;

            m.canproceed = index == 0 ||  m.indexId <= this.currentStep;
        });
        this.currentTask.completed = this.currentTask.findcount >= this.currentTask.listcount
    }

    get progressUrl() {
        let url = "";

        if (this.currentStep > 0 && this.currentTask.findcount >= this.currentTask.listcount) {
            url = `url('assets/img/work_finish.png')`;
        }
        else if (this.currentStep > 0 && this.currentTask.findcount < this.currentTask.listcount) {
            url = `url('assets/img/work_doing.png')`;
        }
        else {
            url = `url('assets/img/work_bf_doing.png')`;
        }

        return url;
    }

    navigateToTaskDetail(index) {
        if (environment.clientType == 'Client' && !this.stepArray[index].canproceed) {
            this.toast("不能进行该步骤");
            return;
        }
        if (index == (this.totalStep - 1)) {
            throw "not implemented";
            // this.navCtrl.push(MastListPage, {
            //     workId: this.currentTask.work_id,
            //     process: this.stepArray[index].indexId,
            //     taskType: this.taskType,
            //     stepCompleted: this.stepArray[index].completed,
            //     taskCompleted: this.currentTask.completed,
            //     listCount: this.currentTask.listcount,
            //     // mastList: this.mastList,
            //     step: this.stepArray[index],
            // });

            // this.updateMastListSubscription = this.fetchDetailObservable.subscribe(() => {
            //     this.navCtrl.push(MastListPage, {
            //         workId: this.currentTask.work_id,
            //         process: this.stepArray[index].indexId,
            //         taskType: this.taskType,
            //         stepCompleted: this.stepArray[index].completed,
            //         taskCompleted: this.currentTask.completed,
            //         listCount: this.currentTask.listcount,
            //         mastList: this.mastList,
            //         step: this.stepArray[index],
            //     });
            // });
        }
        else {
            throw "not implemented";
            // this.navCtrl.push(DetailPage, {
            //     workId: this.currentTask.work_id,
            //     process: this.stepArray[index].indexId,
            //     taskType: this.taskType,
            //     stepCompleted: this.stepArray[index].completed,
            //     taskCompleted: this.currentTask.completed,
            //     name: this.stepArray[index].name,
            //     step: this.stepArray[index]
            // });
        }


    }

}