import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, ModalController, AlertController, LoadingController } from '@ionic/angular';
import { DetailPage } from '../detail/detail';
import { MainPage, TabsPage } from '../pages';
import { TaskType } from '../../shared/task-type';
import { MapDialogPage } from '../pages';
import { UserService, TaskStore, ToastService } from '../../services/providers';
import { AddTaskService } from './add-task.service';
import { Platform } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';
import { Router } from '@angular/router';

declare var BMap;
declare var BMAP_STATUS_SUCCESS;

@Component({
    selector: 'page-add-task',
    templateUrl: 'add-task.html'
})
export class AddTaskPage implements OnInit {

    private detailPage;
    private tasktype: TaskType = TaskType.Fixing;
    public selectedvalue: any;
    public selectlabel: string;
    public Options: any[];
    public showSelect: boolean;
    public isprospect: string = '0';
    public listcount: string = '0';
    public title: string;

    public currentlat: number = 0;
    public currentlng: number = 0;
    public address: string;

    constructor(public navCtrl: NavController,
        public router: Router,
        public appCtrl: App,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private userService: UserService,
        private api: AddTaskService,
        private toastService: ToastService,
        private platform: Platform,
        private taskStore: TaskStore,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private nativeToast: Toast) {

        this.detailPage = DetailPage;
        this.tasktype = this.navParams.data && this.navParams.data.taskType || TaskType.Fixing;

        /*this.address = '四川省成都市老成仁路6号';
        this.currentlng = 104.06792346;
        this.currentlat = 30.67994285;*/
    }

    async ngOnInit() {
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        switch (this.tasktype) {
            case TaskType.Fixing:
                this.selectlabel = '是否需要现场勘察';
                this.Options = [{ name: '否', value: 0 }, { name: '是', value: 1 }];
                this.showSelect = true;
                this.selectedvalue = this.Options[0];
                break;
            case TaskType.Walking:
                this.selectlabel = '巡视杆塔数';
                this.Options = new Array(50).fill(0).map((value, index) => {
                    return {name: index, value: index};
                });
                this.showSelect = true;
                this.selectedvalue = this.Options[0];
                break;
            case TaskType.Monitoring:
                this.selectlabel = '监督检查类型';
                this.Options = [{ name: '安全管理', value: 0 }, { name: '作业现场', value: 1 }];
                this.showSelect = true;
                this.selectedvalue = this.Options[0];
                break;
            case TaskType.Switching:
                this.showSelect = false;
                break;
        }
    }

    navigateToHome() {
        this.router.navigate(['/home']);
    }

    saveTask() {
        switch (this.tasktype) {
            case TaskType.Fixing:
                this.isprospect = this.selectedvalue.value.toString();
                break;
            case TaskType.Walking:
                this.listcount = this.selectedvalue.value.toString();
                break;
            case TaskType.Monitoring:
                this.isprospect = this.selectedvalue.value.toString();
                break;
            case TaskType.Switching:
                break;
        }
        this.api.AddWork(this.userService.phoneNo,
            this.userService.user.userid,
            this.title,
            this.address,
            this.currentlat.toString(),
            this.currentlng.toString(),
            this.isprospect,
            this.tasktype.toString(),
            this.listcount).subscribe((resp: any) => {

                this.toastService.show(resp.msg);

                this.taskStore.resetCurrentTask();
                this.router.navigate([`tabs/${this.tasktype}/current-task`]);
            },
            (error: any) => {
                this.toastService.show(error && error.message || error || "添加任务失败");
            })
    }

    async showConfirm() {
        let message = '';
        switch (this.tasktype) {
            case TaskType.Fixing:
                if(this.selectedvalue.value.toString() == '0'){
                    message = '请确认是否提交该工单?该工单不进行现场勘察工作';
                }else{
                    message = '请确认是否提交该工单?该工单进行现场勘察工作';
                }
                break;
            case TaskType.Walking:
                if(this.selectedvalue.value.toString() == '0'){
                    let loading = await this.loadingCtrl.create({
                        message: '作业流程:请选择巡视杆塔的数量',
                        duration: 2000
                    });
                    loading.present();
                }else{
                    message = '请确认是否提交该工单?该工巡视杆塔数量为' + this.selectedvalue.value.toString();
                }
                break;
            case TaskType.Monitoring:
                if(this.selectedvalue.value.toString() == '0'){
                    message = '请确认是否提交该工单?该工单为安全管理类监督检查';
                }else{
                    message = '请确认是否提交该工单?该工单为作业现场类监督检查';
                }
                break;
            case TaskType.Switching:
                break;
        }
        if(this.tasktype == TaskType.Switching){
            this.saveTask();
        }else if(message != ''){
            let confirm = await this.alertCtrl.create({
                message: message,
                buttons: [
                  {
                    text: '取消',
                    handler: () => {
                      console.log('Disagree clicked');
                    }
                  },
                  {
                    text: '确认',
                    handler: () => {
                      this.saveTask();
                    }
                  }
                ]
              });
              confirm.present();
        }
        
      }
}
