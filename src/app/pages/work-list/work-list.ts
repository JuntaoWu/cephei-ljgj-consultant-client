import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MainPage } from "../pages";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { WorkListService } from './work-list.service';
import { UserService, ToastService } from '../../services/providers';
import { LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { TaskStore } from '../../services/stores/task.store';
import { TaskConfig } from '../current-task/task.config';
import { Router } from '@angular/router';

@Component({
    selector: 'page-work-list',
    templateUrl: 'work-list.html',
    styleUrls: ['work-list.scss']
})

export class WorkListPage implements OnInit {
    public worklist: any[];
    public starttime: string;
    public endtime: string;
    public startdate: Date;
    public enddate: Date;
    private ordertype: TaskType;
    private areaId: string;
    public areaName: string;
    private taskConfig: any = TaskConfig;
    private isShowType:boolean = false;

    constructor(public navCtrl: NavController,
        public router: Router,
        public navParams: NavParams,
        public api: WorkListService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController,
        private taskStore: TaskStore) {
        let params = this.navParams.data;
        this.areaId = params && params.areaId;
        this.ordertype = params && params.tasktype;
        this.areaName = params && params.areaName;
        if(this.ordertype == TaskType.Monitoring){
            this.isShowType = true;
        }
    }
    async ngOnInit() {
        console.log(this.userService);
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        let loading = await this.loadingCtrl.create({
            message: '获取数据中...'
        });

        loading.present().then(() => {
            this.api.getAreaList(this.userService.phoneNo, this.starttime, this.endtime, this.ordertype.toString(), this.areaId).subscribe((resp: any) => {
                console.log("Fetch Current Task successfully");
                loading.dismiss();

                this.toastService.show(resp.msg);

                if (resp.list && resp.list.length) {
                    this.worklist = resp.list;
                }
            },
                () => {
                    loading.dismiss();
                    this.toastService.show("Error");
                });
        })
    }

    navigateToHome() {
        this.router.navigate(['/home']);
    }

    navigateToCurrentTask(row) {
        this.taskStore.setCurrentTask(row);
        this.router.navigate(['current-task']);
    }

    generateSelectedArray(row): number[] {
        var selectedarray: number[] = [];
        var selected: number;
        var config: any;
        switch (this.ordertype) {
            case TaskType.Fixing:
                if (Number(row.process) < 0) {
                    selected = 0;
                } else {
                    selected = Number(row.process) + Number(row.isprospect)
                }
                break;
            case TaskType.Walking:
                if (Number(row.process) < 0) {
                    selected = 0;
                } else {
                    if (Number(row.process) == this.taskConfig[this.ordertype][0].maxStep) {
                        if (Number(row.findcount) >= Number(row.listcount)) {
                            selected = Number(row.process);
                        } else {
                            selected = Number(row.process) - 1;
                        }
                    } else {
                        selected = Number(row.process);
                    }
                }
                break;
            case TaskType.Monitoring:
                selected = Number(row.findcount);
                break;
            case TaskType.Switching:
                if (Number(row.process) < 0) {
                    selected = 0;
                } else {
                    selected = row.process;
                }
                break;
        }
        for (var i = 0; i < selected; i++) {
            selectedarray.push(i);
        }
        return selectedarray;

    }

    generateUnSelectedArry(row): number[] {
        var unselectedarray: number[] = [];
        var unselected: number;
        switch (this.ordertype) {
            case TaskType.Fixing:
                if (Number(row.process) < 0) {
                    unselected = Number(row.isprospect) == 1 ? this.taskConfig[this.ordertype][1].maxStep : this.taskConfig[this.ordertype][0].maxStep;
                } else {
                    if (Number(row.isprospect) == 1) {
                        unselected = this.taskConfig[this.ordertype][1].maxStep - (Number(row.process) + Number(row.isprospect));
                    } else if (Number(row.isprospect) == 0) {
                        unselected = this.taskConfig[this.ordertype][0].maxStep - Number(row.process);
                    }
                }
                break;
            case TaskType.Walking:
                if (Number(row.process) < 0) {
                    unselected = this.taskConfig[this.ordertype][0].maxStep;
                } else {
                    if (Number(row.process) == this.taskConfig[this.ordertype][0].maxStep) {
                        if (Number(row.findcount) < Number(row.listcount)) {
                            unselected = 1;
                        }
                    } else {
                        unselected = this.taskConfig[this.ordertype][0].maxStep - Number(row.process);
                    }
                }
                break;
            case TaskType.Monitoring:
                unselectedarray = [];
                break;
            case TaskType.Switching:
                if (Number(row.process) < 0) {
                    unselected = this.taskConfig[this.ordertype][0].maxStep;
                } else {
                    unselected = this.taskConfig[this.ordertype][0].maxStep - Number(row.process);
                }
                break;
        }

        for (var i = 0; i < unselected; i++) {
            unselectedarray.push(i);
        }
        return unselectedarray;
    }

    isNotWorkCompleted(row): boolean {
        let flag = false;
        switch (this.ordertype) {
            case TaskType.Fixing:
                if (Number(row.process) < 7) {
                    flag = true;
                };
                break;
            case TaskType.Walking:
                if (Number(row.process) != this.taskConfig[this.ordertype][0].maxStep || Number(row.findcount) < Number(row.listcount)) {
                    flag = true;
                };
                break;
            case TaskType.Monitoring:
                if (Number(row.status) == 0) {
                    flag = true;
                };
                break;
            case TaskType.Switching:
                if (Number(row.process) < 4) {
                    flag = true;
                }
                break;
        }
        return flag;
    }

    generateType(row):string{
        var reuslt = '类型: ';
        if(Number(row.isprospect) == 0){
            reuslt = reuslt + '安全管理';
        }else {
            reuslt = reuslt + '作业现场';
        }
        return reuslt;
    }
}