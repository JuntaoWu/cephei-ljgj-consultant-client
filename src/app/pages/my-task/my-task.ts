import { Component } from '@angular/core';
import { NavController, NavParams, IonRefresher as Refresher } from '@ionic/angular';
import { MainPage } from "../pages";
import { DetailPage } from "../detail/detail";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { MyTaskService } from './my-task.service';

import { UserService, TaskStore, ToastService } from '../../services/providers';
import { LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { TaskConfig } from '../current-task/task.config';


@Component({
    selector: 'page-my-task',
    templateUrl: 'my-task.html'
})
export class MyTaskPage implements OnInit {

    private taskType: TaskType = TaskType.Fixing;

    private detailPage;

    public myworklist: any[];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public api: MyTaskService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController,
        private taskStore: TaskStore) {

        this.detailPage = DetailPage;
        //this.taskType = navParams.get('taskType');
        this.taskType = this.navParams.data && this.navParams.data.taskType || TaskType.Fixing;
    }

    async ngOnInit() {
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        let loading = await this.loadingCtrl.create({
            message: '获取任务单中'
        });

        loading.present().then(() => {
            this.api.getMyWorkList(this.userService.phoneNo, this.userService.user.userid, this.taskType.toString()).subscribe((resp: any) => {
                console.log("get my current task");
                loading.dismiss();
                this.toastService.show(resp.msg);

                if (resp.list && resp.list.length) {
                    this.myworklist = resp.list;
                }
            },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取任务单失败");
                });
        })
    }

    doRefresh(refresher: Refresher) {
        this.api.getMyWorkList(this.userService.phoneNo, this.userService.user.userid, this.taskType.toString()).subscribe((resp: any) => {
            console.log("get my current task");
            this.toastService.show(resp.msg);

            if (resp.list && resp.list.length) {
                this.myworklist = resp.list;
            }
            refresher.complete();
        },
            (error) => {
                this.toastService.show(error && error.message || error || "获取任务单失败");
                refresher.complete();
            });
    }

    navigateToHome() {
        throw "not impl";
        // this.appCtrl.getRootNavs()[0].setRoot(MainPage);
    }

    navigateToCurrentTask(row) {
        this.taskStore.setCurrentTask(row);
        throw "not impl";
        // this.navCtrl.parent.select(0);  //change selected workId & select the 1st tab
    }

    isWorkCompleted(row) {
        let flag = false;
        switch (row.ordertype) {
            case TaskType.Fixing.toString():
                if (row.process < 7) {
                    flag = true;
                };
                break;
            case TaskType.Walking.toString():
                if (row.process != 3 || row.findcount < row.listcount) {
                    flag = true;
                };
                break;
            case TaskType.Monitoring.toString():
                if (row.process < 6) {
                    flag = true;
                };
                break;
            case TaskType.Switching.toString():
                if (row.process < 4) {
                    flag = true;
                }
                break;
        }
        return flag;
    }
}
