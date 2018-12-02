import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TabsPage, UserCenterPage } from "../pages";
import { UserService, Settings } from '../../services/providers';
import { OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { AreaStore } from '../../services/providers';
import { environment } from '../../../environments/environment';
import { Toast } from '@ionic-native/toast/ngx';

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

    public client: boolean = false;
    public management: boolean = false;
    public versionLabel: string;

    public orderId: string;
    public wxOpenId: string;

    constructor(public navCtrl: NavController,
        private settings: Settings,
        private toast: ToastController,
        private userService: UserService, private loadingCtrl: LoadingController, private area: AreaStore) {
        this.tabsRoot = TabsPage;
        this.fixing = { taskType: TaskType.Fixing };
        this.inspectInspection = { taskType: TaskType.Walking };
        this.supervisedCheck = { taskType: TaskType.Monitoring };
        this.switchingOperation = { taskType: TaskType.Switching };
    }

    async ngOnInit() {
        if (environment.clientType == "Client") {
            this.client = true;
        } else {
            this.management = true;
        }

        this.versionLabel = `当前版本${environment.version}`;
    }

    async createUnifiedOrder() {
        const storedWxOpenId = await this.settings.getValue('wxOpenId');
        const wxOpenId = this.wxOpenId || storedWxOpenId;
        const toast = await this.toast.create({
            message: wxOpenId,
            duration: 2000,
            translucent: true,
        });
        toast.present();
        this.userService.createUnifiedOrder(wxOpenId, this.orderId).subscribe(
            (res) => {
                console.log(res);
            },
            (err) => {
                console.error(err);
                this.toast.create({
                    message: err.error && err.error.message || err.message,
                    duration: 2000,
                    translucent: true,
                }).then(toast => toast.present());
            });
    }

    navigateToUserCenter() {
        this.navCtrl.navigateForward(UserCenterPage);
    }

}
