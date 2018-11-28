import { Component, OnInit } from '@angular/core';
import { App, NavController, NavParams, Platform, LoadingController } from '@ionic/angular';
import { MainPage, UserInfoPage, LoginPage } from '../pages';

import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore, ToastService } from '../../services/providers';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserCenterValidate } from './user-center-validate';
import { UserCenterService } from './user-center.service';


@Component({
    selector: 'page-user-center',
    templateUrl: 'user-center.html'
})

export class UserCenterPage implements OnInit {
    private tasktype: TaskType = TaskType.Fixing;
    public usercenterForm: FormGroup;
    public phone: string;
    public username: string;
    public password: string;
    public confirmpassword: string;
    public userinfo: any;
    public areainfo: any;
    public areaname:string;
    constructor(public navCtrl: NavController,
        private navParams: NavParams,
        private appCtrl: App,
        private platform: Platform,
        private userService: UserService,
        private api: UserCenterService,
        private toastService: ToastService,
        private loadingCtrl: LoadingController) {
    }

    async ngOnInit() {
        this.usercenterForm = new FormGroup({
            'password': new FormControl(this.password, [
                Validators.required
            ]),
            'confirmpassword': new FormControl(this.confirmpassword, [
                Validators.required,
                UserCenterValidate.IsSamePassword()
            ])
        });
        let loading = await this.loadingCtrl.create({
            message: '获取个人信息...'
        });

        loading.present().then(() => {
            this.api.getUserInfo(this.userService.phoneNo, this.userService.user.userid).subscribe((resp: any) => {
                loading.dismiss();
                if (resp.info && resp.areaname) {
                    this.userinfo = resp.info;
                    this.areainfo = resp.areaname;
                    this.phone = this.userinfo.username
                    this.username = this.userinfo.fullname;
                    this.areaname = this.areainfo.name;
                }
            },
                (error) => {
                    loading.dismiss();
                    this.toastService.show(error && error.message || error || "获取数据失败");
                });

        })
    }

    async updateUserInfo() {
        let loading = await this.loadingCtrl.create({
            message: '数据更新中...'
        });
        loading.present().then(() => {
            this.api.UpdateUserInfo(this.userService.phoneNo, this.userService.user.userid, this.password, this.phone, this.username, this.areainfo.departmentid).subscribe((resp: any) => {
                if (resp.status == 'true') {
                    loading.dismiss();
                    throw "not implemented";
                    // this.appCtrl.getRootNavs()[0].setRoot(MainPage);
                    this.toastService.show(resp.msg);
                }
            }, (error) => {
                loading.dismiss();
                this.toastService.show(error && error.message || error || "获取更新失败");
            });
        })

    }

    exitApp() {
        throw "not implemented";
        // if(this.platform.is('android')){
        //     this.platform.exitApp();
        // }else if(this.platform.is('ios')){
        //     this.appCtrl.getRootNavs()[0].setRoot(LoginPage);
        // }
    }


}