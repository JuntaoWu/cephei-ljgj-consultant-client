import { Component, OnInit, ElementRef } from '@angular/core';
import { App, NavController, NavParams, ModalController } from '@ionic/angular';
import { MainPage } from '../pages';

import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore, ToastService } from '../../services/providers';

import { UserManagerService } from './user-manager.service';
import { LoadingController } from '@ionic/angular';


@Component({
    selector: 'page-area-list-dialog',
    templateUrl: 'area-list-dialog.html'
})

export class AreaListDialogPage implements OnInit{
    public userAreaList: any[];
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public appCtrl: App,
        public api: UserManagerService,
        private userService: UserService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController,
        public modalCtrl: ModalController){

    }

    async ngOnInit() {
        console.log(this.userService);
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        let loading = await this.loadingCtrl.create({
            message: 'Fetching current task. Please wait...'
        });

        loading.present().then(() => {
            this.api.getAreaList(this.userService.phoneNo, this.userService.user.userid).subscribe((resp: any) => {
                    console.log("Fetch Current Task successfully");
                    loading.dismiss();

                    this.toastService.show(resp.msg);

                    if (resp.list && resp.list.length) {
                         this.userAreaList = resp.list;
                    }
                } ,
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取区域列表失败");
                });
        })
    }

    selectItem(row){
        this.modalCtrl.dismiss(row);
    }
    
}