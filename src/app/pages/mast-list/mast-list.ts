import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { UserService, ToastService, TaskStore } from '../../services/providers';
import { OnInit, OnDestroy } from '@angular/core';
import { DetailPage } from '../pages';
import { environment } from '../../../environments/environment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CurrentTaskService } from '../current-task/current-task.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'page-mast-list',
    templateUrl: 'mast-list.html'
})
export class MastListPage implements OnInit, OnDestroy {

    private informations: any[] = [{ id: 1, open: false }, { id: 2, open: false }, { id: 3, open: false }]
    private workId: string;
    private process: number;
    private taskType: TaskType;
    private taskCompleted: boolean;
    private stepCompleted: boolean;
    private listCount: number;
    private mastList: any[] = [];
    private step: any;
    private currentTaskSubscription: Subscription;
    private loading: any;

    public detail: any = {};
    private actionSheet: any;
    constructor(public navCtrl: NavController,
        public api: CurrentTaskService,
        private taskStore: TaskStore,
        private userService: UserService,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private toastService: ToastService,
        private photoViewer: PhotoViewer) {

        let params = this.navParams.data;
        this.workId = params && params.workId;
        this.process = params && params.process;
        this.taskType = params && params.taskType;
        this.taskCompleted = params && params.taskCompleted;
        this.stepCompleted = params && params.stepCompleted;
        this.listCount = params && parseInt(params.listCount);
        // this.mastList = params && params.mastList;
        this.step = params && params.step;
    }

    private toast(message: string) {
        this.toastService.show(message);
    }

    async ngOnInit() {

        this.currentTaskSubscription = this.taskStore.currentTask.subscribe(async task => {

            this.loading = await this.loadingCtrl.create({
                message: '数据加载中'
            });
            await this.loading.present();

            this.api.getTaskDetail(this.userService.phoneNo, this.workId || task.id, this.taskType).subscribe((resp: any) => {
                this.loading && this.loading.dismiss();
                console.log("updateWorkDetailSubscription");
                if (resp.workdetail && resp.workdetail.length) {
                    // resp.workdetail.forEach(i => {
                    //     this.stepArray[i.indexid - 1].completed = true;
                    // });
                    console.log("mastList <= workDetail");
                    this.mastList = resp.workdetail;
                }
                else {
                    this.mastList = [];
                }

                this.informations = new Array(this.listCount).fill({}).map((value, index) => {
                    let mast = this.mastList.find(m => m.indexid == index + 1);
                    return {
                        open: false,
                        completed: !!mast,
                        mast: mast,
                        images: mast && mast.imgurl && mast.imgurl.split(",").map(url => {
                            return { src: `${environment.host}${url}` };
                        })
                    };
                });
            },
                (error) => {
                    this.loading && this.loading.dismiss();
                    this.toast(error.message);
                });
        });
    }

    ngOnDestroy() {
        this.currentTaskSubscription && this.currentTaskSubscription.unsubscribe();
    }

    toggleSection(i) {
        if (!this.informations[i].completed) {
            this.toastService.show("该步骤还未提交任务内容，请先提交...");
            return;
        }
        this.informations[i].open = !this.informations[i].open;
    }

    navigateToDetail(i) {
        throw "not implemented";
        // this.navCtrl.push(DetailPage, {
        //     workId: this.workId,
        //     process: this.process,
        //     taskType: this.taskType,
        //     indexId: i + 1,
        //     stepCompleted: this.informations[i].completed,
        //     taskCompleted: this.taskCompleted,
        //     name: "巡视检查",
        //     step: this.step
        // });
    }

    showPicture(url) {
        this.photoViewer.show(url);
    }

}