import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MainPage, UserInfoPage } from '../pages';
import { TaskType } from '../../shared/task-type';
import { UserService, TaskStore } from '../../services/providers';

import { UserAreaListPage } from "../pages";

@Component({
    selector: 'page-user-manager',
    templateUrl: 'user-manager.html',
    styleUrls: ['user-manager.scss']
})

export class UserManagerPage implements OnInit{
    private tasktype:TaskType = TaskType.Fixing;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams){
        this.tasktype = this.navParams.data && this.navParams.data.taskType || TaskType.Fixing;
    }

    async ngOnInit() {
        
    }

    navigateToUserAreaList() {
        throw "not implemented";
        // this.navCtrl.push(UserAreaListPage, {
        //     tasktype: this.tasktype
        // });
    }

    navigateToHome() {
        throw "not implemented";
        // this.appCtrl.getRootNavs()[0].setRoot(MainPage);
    }

    navigateToUserInfo(){
        throw "not implemented";
        // this.navCtrl.push(UserInfoPage,{
        //     operationtype:'AddUser'
        // })
    }
}