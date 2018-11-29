import { Component } from '@angular/core';
import { App, NavController } from '@ionic/angular';
import { DetailPage } from '../pages';
import { MainPage } from '../pages';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { CurrentTaskService } from './current-task.service';

import { UserService, TaskStore, AreaStore, ToastService } from '../../services/providers';
import { LoadingController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { TaskConfig } from './task.config';
import { Subscription ,  Observable } from 'rxjs';
import { TaskType } from '../../shared/task-type';
import { map } from 'rxjs/operators';


@Component({
    selector: 'page-current-task',
    templateUrl: 'current-task.html'
})
export class CurrentTaskPage implements OnInit, OnDestroy {

    //public enums
    public TaskType = TaskType;

    public taskType: TaskType = TaskType.Fixing;
    protected taskConfig: any = TaskConfig;

    protected totalStep: number;
    protected maxIndex: number;
    protected currentStep: number = 0;
    public lineArray: any[];
    public stepArray: any[];

    public currentTask: any = { work_id: null };
    protected currentTaskSubscription: Subscription;

    public title: string;

    private detailPage;

    private availHeight: number = 667;
    private unit: number = 38;

    protected loading: any;

    constructor(public navCtrl: NavController,
        public appCtrl: App,
        public api: CurrentTaskService,
        protected userService: UserService,
        protected toastService: ToastService,
        protected loadingCtrl: LoadingController,
        private navParams: NavParams,
        protected taskStore: TaskStore,
        private areaStore: AreaStore) {

        this.taskType = this.navParams.data && this.navParams.data.taskType || TaskType.Fixing;

        let config = this.taskConfig[this.taskType][0];
        this.totalStep = config.maxStep;
        this.maxIndex = config.maxIndex;
        this.lineArray = new Array(this.totalStep);
        this.stepArray = this.transformStepArray(config, config.stepArray);

        this.detailPage = DetailPage;

        this.availHeight = window.screen.availHeight;
        this.unit = this.availHeight / 1920 * 110;
    }

    async ngOnInit() {
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        this.taskStore.resetCurrentTask();

        this.currentTaskSubscription = this.taskStore.currentTask.subscribe(async task => {
            task = task || {};
            this.currentTask = { work_id: task.id };
            this.title = task.title;
            await this.loadCurrentTask();
            this.loadTaskDetail(this.currentTask);
        });

        console.log(`workId is: ${this.currentTask && this.currentTask.work_id}`);
        //!this.workId && this.taskStore.setWorkId(this.workId);  //workIdSubscription will be triggered when 1st time loaded or taskStore contains a value.
    }

    ngOnDestroy(): void {
        this.currentTaskSubscription && this.currentTaskSubscription.unsubscribe();
    }

    private transformStepArray(config, stepArray) {
        return stepArray.map(step => {
            return Object.assign({}, step, { normalSrc: `assets/img/${step.icon}${config.normalSuffix}`, checkedSrc: `assets/img/${step.icon}${config.checkedSuffix}` });
        });
    }

    protected toast(message: any) {
        this.toastService.show(message);
    }

    async loadCurrentTask() {
        this.loading = await this.loadingCtrl.create({
            message: '数据加载中'
        });
        await this.loading.present();

        const subscription = await this.api.getCurrentTask(this.userService.phoneNo,
            this.userService.user.userid,
            this.taskType,
            this.currentTask && this.currentTask.work_id,
            this.areaStore.areaId).pipe(map((resp: any) => {
                this.toast(resp.msg);

                if (resp.list && resp.list.length) {
                    let task = resp.list[0];
                    this.currentTask = task;
                    this.title = task.title;
                    this.currentStep = parseInt(task.process) + 1;

                    let config = this.taskConfig[this.taskType][task.isprospect];
                    this.totalStep = config.maxStep;
                    this.maxIndex = config.maxIndex;
                    this.lineArray = new Array(this.totalStep);

                    this.stepArray = this.transformStepArray(config, config.stepArray);

                    this.refreshTaskStatus();
                }
                return resp;
            },
            (error: any) => {
                this.loading && this.loading.dismiss();
                this.toast(error.message);
            })).toPromise();
        return subscription;
    }

    protected refreshTaskStatus() {
        throw "refreshTaskStatus should be implemented in subclass.";
    }

    protected loadTaskDetail(task) {
        throw "loadTaskDetail should be implemented in subclass.";
    }

    protected async loadTaskDetailHelper(task) {

        this.api.getTaskDetail(this.userService.phoneNo,
            this.currentTask && this.currentTask.work_id,
            this.taskType).subscribe((resp: any) => {
                
                if (resp.workdetail && resp.workdetail.length) {
                    resp.workdetail.forEach(i => {
                        this.stepArray[i.indexid - 1].completed = true;
                    });
                }
            },
            (error) => {
                this.toast(error.message);
            });
    }

    public navigateToHome() {
        throw "not implemented";
        // this.appCtrl.getRootNavs()[0].setRoot(MainPage);
    }

    public getFabTop(index) {
        let init = index % 2 == 0 ? 8 : 8 + this.unit;
        return `${init + Math.floor(index / 2) * this.unit * 2}px`;
    }

    public get progressUrl(): string {
        throw "progressUrl should be implemented in subclass.";
    }

    public get taskContainerHeight() {
        return `${this.unit * this.totalStep}px`;
    }

    public isCellHighlight(index) {
        return this.isFabHighlight(this.stepArray[index], index);
    }

    public isFabHighlight(step, index) {
        return (step && step.completed) || (this.currentTask && (this.taskType == TaskType.Fixing || this.taskType == TaskType.Switching) && index < this.currentTask.process);
    }

    public navigateToTaskDetail(index) {
        throw "not implemented";
        // this.navCtrl.push(DetailPage, {
        //     workId: this.currentTask.work_id,
        //     process:  this.stepArray[index].indexId,
        //     taskType: this.taskType,
        //     stepCompleted: this.stepArray[index].completed,
        //     taskCompleted: this.currentTask.completed,
        //     name: this.stepArray[index].name,
        //     step: this.stepArray[index]
        // });
    }

}