import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MainPage } from '../pages';
import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore, ToastService } from '../../services/providers';

import { UserManagerService } from './user-manager.service';
import { LoadingController } from '@ionic/angular';
import { UserInfoPage } from "../pages";

@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
    styleUrls: ['user-list.scss']
})

export class UserListPage implements OnInit{
    public userList: any[];
    private areaId:string;
    private areaName:string;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public api: UserManagerService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController){
            let params = this.navParams.data;
            this.areaId = params && params.areaId;
            this.areaName = params && params.areaName;
    }

    async ngOnInit() {
        console.log(this.userService);
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        let loading = await this.loadingCtrl.create({
            message: '查询中...'
        });

        loading.present().then(() => {
            this.api.getUserList(this.userService.phoneNo, this.areaId).subscribe((resp: any) => {
                    console.log("Fetch Current Task successfully");
                    loading.dismiss();

                    this.toastService.show(resp.msg);

                    if (resp.list && resp.list.length) {
                         this.userList = resp.list;
                    }
                } ,
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取用户列表失败");
                });
        })
    }

    navigateToUserInfo(row) {
        throw "not implemented";
        // this.navCtrl.push(UserInfoPage, {
        //     userId: row.id,
        //     fullName:row.fullname,
        //     userName:row.username,
        //     departmentId:row.departmentid,
        //     departmentName:this.areaName,
        //     operationtype:'UserDetail'
        // });
    }
}