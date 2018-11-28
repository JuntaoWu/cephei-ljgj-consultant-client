import { Component } from '@angular/core';
import { App, NavController, NavParams } from '@ionic/angular';
import { MainPage } from "../pages";
import { WorkListPage } from "../pages";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { AreaListService } from './area-list.service';

import { UserService, ToastService, AreaStore, TaskStore } from '../../services/providers';
import { TaskType } from '../../shared/task-type';
import { LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { Slides } from '@ionic/angular';
import { TaskConfig } from '../current-task/task.config';
import * as moment from 'moment';


@Component({
    selector: 'page-area-list',
    templateUrl: 'area-list.html'
})

export class AreaListPage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    public areaklist: any[];
    public worklist: any[] = [];
    private worklistpage;
    private tasktype: TaskType = TaskType.Fixing;
    public isShowSpeartion: boolean;
    public isShowAll: boolean;
    public selectType: string;
    public areaidlist: string;
    public starttime: string = moment().subtract(7, "days").format("YYYY-MM-DD");
    public endtime: string = moment().format("YYYY-MM-DD");
    private taskConfig: any = TaskConfig;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appCtrl: App,
        public api: AreaListService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController,
        private area: AreaStore,
        private taskStore: TaskStore) {

        this.worklistpage = WorkListPage;
        this.tasktype = this.navParams.data && this.navParams.data.taskType || TaskType.Fixing;
        this.isShowSpeartion = true;
        this.isShowAll = false;
        this.selectType = 'partition';
        if (this.area && this.area.areaId && this.area.areaId.length > 0) {
            this.areaidlist = this.area.areaId.map(area => area.departmentid || area).join(',');
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
            this.api.getWorkList(this.userService.phoneNo, this.areaidlist, this.starttime, this.endtime, this.tasktype.toString())
                .subscribe((resp: any) => {
                    loading.dismiss();
                    this.areaklist = this.area.areaId.map(area => {
                        return {
                            id: area.departmentid,
                            name: area.departmentname,
                        };
                    });
                    this.toastService.show(resp.msg);
                    if (resp.list && resp.list.length) {
                        this.worklist = resp.list;
                    }
                },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取数据失败");
                });
        });
    }

    navigateToHome() {
        throw "not implemented";
        // this.appCtrl.getRootNavs()[0].setRoot(MainPage);
    }

    navigateToWorkList(row) {
        throw "not implemented";
        // this.navCtrl.push(WorkListPage, {
        //     areaId: row.id,
        //     areaName: row.name,
        //     tasktype: this.tasktype
        // });
    }

    navigateToCurrentTask(row) {
        this.taskStore.setCurrentTask(row);
        throw "not implemented";
        // this.navCtrl.parent.select(0);
    }

    async sildeChanged() {
        let currentIndex = await this.slides.getActiveIndex();
        if (currentIndex == 0) {
            this.selectType = 'partition';
        } else {
            this.selectType = 'whole';
        }
    }

    selectPartition() {
        this.slides.slideTo(0);
    }

    selectWhole() {
        this.slides.slideTo(1);
    }

    isNotWorkCompleted(row): boolean {
        let flag = false;
        switch (parseInt(row.ordertype)) {
            case TaskType.Fixing:
                if (Number(row.process) < 7) {
                    flag = true;
                };
                break;
            case TaskType.Walking:
                if (Number(row.process) != this.taskConfig[row.ordertype][0].maxStep || Number(row.findcount) < Number(row.listcount)) {
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

    generateSelectedArray(row): number[] {
        var selectedarray: number[] = [];
        var selected: number;
        var config: any;
        switch (parseInt(row.ordertype)) {
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
                    if (Number(row.process) == this.taskConfig[parseInt(row.ordertype)][0].maxStep) {
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
        switch (parseInt(row.ordertype)) {
            case TaskType.Fixing:
                if (Number(row.process) < 0) {
                    unselected = Number(row.isprospect) == 1 ? this.taskConfig[parseInt(row.ordertype)][1].maxStep : this.taskConfig[parseInt(row.ordertype)][0].maxStep;
                } else {
                    if (Number(row.isprospect) == 1) {
                        unselected = this.taskConfig[parseInt(row.ordertype)][1].maxStep - (Number(row.process) + Number(row.isprospect));
                    } else if (Number(row.isprospect) == 0) {
                        unselected = this.taskConfig[parseInt(row.ordertype)][0].maxStep - Number(row.process);
                    }
                }
                break;
            case TaskType.Walking:
                if (Number(row.process) < 0) {
                    unselected = this.taskConfig[parseInt(row.ordertype)][0].maxStep;
                } else {
                    if (Number(row.process) == this.taskConfig[parseInt(row.ordertype)][0].maxStep) {
                        if (Number(row.findcount) < Number(row.listcount)) {
                            unselected = 1;
                        }
                    } else {
                        unselected = this.taskConfig[parseInt(row.ordertype)][0].maxStep - Number(row.process);
                    }
                }
                break;
            case TaskType.Monitoring:
                unselectedarray = [];
                break;
            case TaskType.Switching:
                if (Number(row.process) < 0) {
                    unselected = this.taskConfig[parseInt(row.ordertype)][0].maxStep;
                } else {
                    unselected = this.taskConfig[parseInt(row.ordertype)][0].maxStep - Number(row.process);
                }
                break;
        }

        for (var i = 0; i < unselected; i++) {
            unselectedarray.push(i);
        }
        return unselectedarray;
    }

    async doRefresh(refresher) {
        let loading = await this.loadingCtrl.create({
            message: '获取数据中...'
        });

        this.areaklist = this.area.areaId.map(area => {
            return {
                id: area.departmentid,
                name: area.departmentname,
            };
        });

        loading.present().then(() => {

            this.api.getWorkList(this.userService.phoneNo, this.areaidlist, this.starttime, this.endtime, this.tasktype.toString())
                .subscribe((resp: any) => {
                    loading.dismiss();
                    refresher.complete();
                    this.toastService.show(resp.msg);
                    if (resp.list && resp.list.length) {
                        this.worklist = resp.list;
                    }
                },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取数据失败");
                });
        });
    }

    async search() {
        let loading = await this.loadingCtrl.create({
            message: '获取数据中...'
        });

        loading.present().then(() => {
            this.api.getWorkList(this.userService.phoneNo, this.areaidlist, this.starttime, this.endtime, this.tasktype.toString()).subscribe((resp: any) => {
                loading.dismiss();
                this.toastService.show(resp.msg);
                if (resp.list && resp.list.length) {
                    this.worklist = resp.list;
                }
            },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取数据失败");
                });
        })
    }
}