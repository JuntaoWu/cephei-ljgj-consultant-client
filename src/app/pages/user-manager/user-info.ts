import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, ModalController } from '@ionic/angular';
import { MainPage, AreaListDialogPage, Tab4Root } from '../pages';
import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore, ToastService } from '../../services/providers';

import { UserManagerService } from './user-manager.service';
import { LoadingController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { Router } from '@angular/router';

@Component({
    selector: 'page-user-info',
    templateUrl: 'user-info.html'
})

export class UserInfoPage implements OnInit {
    public userInfo: any;
    public areaInfo: any;
    private userId: string;
    private fullName: string;
    private userName: string;
    private departmentId: string;
    private departmentName: string;
    private password: string;
    private title: string;
    private show: boolean;

    constructor(public navCtrl: NavController,
        public router: Router,
        public navParams: NavParams,
        public appCtrl: App,
        public api: UserManagerService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController) {
        let params = this.navParams.data;
        if (params && params.operationtype && params.operationtype == 'UserDetail') {
            this.show = false;
        } else if (params && params.operationtype && params.operationtype == 'AddUser') {
            this.fullName = '';
            this.userName = '';
            this.departmentName = '';
            this.password = '';
            this.title = '用户信息';
            this.show = true;
        }

    }

    async ngOnInit() {
        let params = this.navParams.data;
        this.userId = params && params.userId;
        this.userName = params && params.userName;
        if (params && params.operationtype && params.operationtype == 'UserDetail') {
            let loading = await this.loadingCtrl.create({
                message: '查询中...'
            });
            loading.present().then(() => {
                this.api.getUserInfo(this.userName, this.userId).subscribe((resp: any) => {
                    console.log("Fetch Current Task successfully");
                    loading.dismiss();
                    this.toastService.show(resp.msg);
                    if (resp.info && resp.areaname) {
                        this.fullName = resp.info.fullname;
                        this.userName = resp.info.username;
                        this.departmentName = resp.areaname.name;
                        this.title =  this.fullName;
                        this.password = '******';
                    }
                    
                },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取用户列表失败");
                });
            })
        }
    }

    async openAreaListDialog() {
        let mapModal = await this.modalCtrl.create({
            component: AreaListDialogPage
        });
        mapModal.onDidDismiss().then(res => {
            this.departmentId = res.data.id;
            this.departmentName = res.data.name;
        });
        mapModal.present();
    }

    UpdateUserInfo() {
        this.api.UpdateUserInfo(this.userService.phoneNo,
            this.departmentId,
            this.userName,
            this.fullName,
            this.password).subscribe((resp: any) => {
                this.toastService.show(resp.msg);
                this.router.navigate([Tab4Root]);
            },
            (error) => {
                this.toastService.show(error && error.message || error || "更新用户信息失败");
            })
    }
}