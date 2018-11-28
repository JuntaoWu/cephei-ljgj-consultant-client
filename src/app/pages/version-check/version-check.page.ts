import { Component, OnInit } from '@angular/core';
import { App, AlertController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { VersionCheckService } from './version-check.service';
import { environment } from '../../../environments/environment';
import { Settings, ToastService } from '../../services/providers';
import { Router } from '@angular/router';

@Component({
    selector: 'page-version-check',
    templateUrl: 'version-check.page.html',
    styleUrls: ['version-check.page.scss'],
})
export class VersionCheckPage implements OnInit {
    public phone: string;
    public versionNo: string;
    public message: string;
    public client: boolean = false;
    public management: boolean = false;
    public versionLabel: string;
    
    constructor(private api: VersionCheckService,
        private router: Router,
        private appCtrl: App,
        private alertCtrl: AlertController,
        private settings: Settings,
        private toastService: ToastService) {
    }

    async ngOnInit() {
        if (environment.clientType == "Client") {
            this.message = '作业流程: ';
            this.client = true;
        } else {
            this.message = '作业管理: ';
            this.management = true;
        }

        this.versionNo = environment.version;
        this.versionLabel = '当前版本' + this.versionNo;

        this.phone = await this.settings.getValue('phone');

        this.api.UpdateCheck(this.phone, this.versionNo).subscribe(async (resp: any) => {
            if (resp.status && resp.status == 'false') {
                this.toastService.show(this.message + resp.msg);
                setTimeout(() => {
                    //this.router.navigate(['/login']);
                }, 2500);
            }
            else {
                let confirm = await this.alertCtrl.create({
                    message: resp.msg,
                    buttons: [
                        {
                            text: '取消',
                            handler: () => {
                                //this.router.navigate(['/login']);
                            }
                        },
                        {
                            text: '下载最新版本',
                            handler: () => {
                                window.open(environment.host + resp.url, '_system');
                            }
                        }
                    ]
                });
                confirm.present();
            }
        }, (error) => {
            this.toastService.show(error.message);
        });
    }
}