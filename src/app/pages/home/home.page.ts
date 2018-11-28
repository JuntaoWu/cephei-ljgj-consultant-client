import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TabsPage, UserCenterPage } from "../pages";
import { UserService } from '../../services/providers';
import { OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { AreaStore } from '../../services/providers';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    private tabsRoot;
    private fixing: any;
    private inspectInspection: any;
    private supervisedCheck: any;
    private switchingOperation: any;
    private result: any;

    constructor(public navCtrl: NavController, private userService: UserService, private loadingCtrl: LoadingController, private area: AreaStore) {
        this.tabsRoot = TabsPage;
        this.fixing = { taskType: TaskType.Fixing };
        this.inspectInspection = { taskType: TaskType.Walking };
        this.supervisedCheck = { taskType: TaskType.Monitoring };
        this.switchingOperation = { taskType: TaskType.Switching };
    }

    async ngOnInit() {
        /*if (!this.userService._user) {
            let loading = await this.loadingCtrl.create({
                message: 'Signing in. Please wait...'
            });
            loading.present().then(() => {
                this.userService.login({
                    "phone": environment.clientType == "Client" ? "13112345678" : "13212345678",
                    "pwd": "123456",
                    "forcelogin": true
                }).subscribe((resp: any) => {
                    if (resp.areaid && resp.areaid.length) {
                        this.area.areaId = resp.areaid;
                    }
                    loading.dismiss();
                });
            });
            //this.navCtrl.push('DetailPage');
            //loading.dismiss();
        }*/
    }

    navigateToUserCenter() {
        this.navCtrl.navigateForward(UserCenterPage);
    }

}
