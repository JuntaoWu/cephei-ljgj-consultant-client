import { Component } from '@angular/core';
import { App, NavController, NavParams, LoadingController } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { UserService, ToastService } from '../../services/providers';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DetailPage } from '../pages';
import { environment } from '../../../environments/environment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
    selector: 'page-security-check-list',
    templateUrl: 'security-check-list.html',
    styleUrls: ['security-check-list.scss']
})
export class SecurityCheckListPage implements OnInit {

    private name: string;
    private informations: any[] = [{ id: 1, open: false }, { id: 2, open: false }, { id: 3, open: false }]
    private workId: string;
    private process: number;
    private taskType: TaskType;
    private stepCompleted: boolean;
    private taskCompleted: boolean;
    private indexId: any[];
    private securityCheckList: any[];
    private step: any;

    public detail: any = {};
    private actionSheet: any;
    constructor(public navCtrl: NavController,
        private userService: UserService,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private toastService: ToastService,
        private photoViewer: PhotoViewer) {

        let params = this.navParams.data;
        this.workId = params && params.workId;
        this.process = params && params.process;
        this.taskType = params && params.taskType;
        this.stepCompleted = params && params.stepCompleted;
        this.taskCompleted = params && params.taskCompleted;
        this.step = params && params.step;
        this.indexId = params && params.indexId;
        this.securityCheckList = params && params.securityCheckList || [];
        this.name = params && params.name;
    }

    async ngOnInit() {
        this.informations = this.indexId.map((value, index) => {
            let childStep = this.step.childSteps[value];
            let securityCheck = this.securityCheckList.find(m => m.indexid == value);
            return {
                open: false,
                completed: !!securityCheck,
                images: securityCheck && securityCheck.imgurl && securityCheck.imgurl.split(",").map(url => {
                    return { src: `${environment.host}${url}` };
                }),
                indexId: value,
                name: childStep.name
            };
        });
    }
    
    toggleSection(i) {
        if(!this.informations[i].completed) {
            this.toastService.show("该步骤还未提交任务内容，请先提交...");
            return;
        }
        this.informations[i].open = !this.informations[i].open;
    }

    navigateToDetail(row) {
        throw "not implemented";
        // this.navCtrl.push(DetailPage, {
        //     workId: this.workId,
        //     process:  row.indexId,
        //     taskType: this.taskType,
        //     indexId: row.indexId,
        //     stepCompleted: row.completed,
        //     taskCompleted: this.taskCompleted,
        //     name: row.name,
        //     step: this.step
        // });
    }

    showPicture(url) {
        this.photoViewer.show(url);
    }

}