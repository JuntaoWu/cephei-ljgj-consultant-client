import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams } from '@ionic/angular';
import { MainPage } from '../pages';

import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore, ToastService } from '../../services/providers';

import { UserManagerService } from './user-manager.service';
import { LoadingController } from '@ionic/angular';
import { UserListPage } from "../pages";


@Component({
    selector: 'page-user-area-list',
    templateUrl: 'user-area-list.html'
})

export class UserAreaListPage implements OnInit {
    public userAreaList: any[];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appCtrl: App,
        public api: UserManagerService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController) {

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
            this.api.getAreaList(this.userService.phoneNo, this.userService.user.userid).subscribe(
                (resp: any) => {
                    console.log("Fetch Current Task successfully");
                    loading.dismiss();
                    this.toastService.show(resp.msg);

                    if (resp.list && resp.list.length) {
                        this.userAreaList = resp.list;
                    }
                },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取区域列表失败");
                });
        });
    }

    navigateToUserList(row) {
        throw "not implemented";
        // this.navCtrl.push(UserListPage, {
        //     areaId: row.id,
        //     areaName: row.name
        // });
    }
}