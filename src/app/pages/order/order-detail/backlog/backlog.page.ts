import { Component, OnInit } from '@angular/core';
import { Backlog } from './backlog.model';
import { BacklogService } from './backlog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { BacklogModalComponent } from './backlog-modal/backlog-modal.component';

import * as _ from 'lodash';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.page.html',
    styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {

    public isLinear = false;
    public noBacklogItems: boolean;
    public backlogItems$?: Observable<Backlog[]>;
    public orderId?: string;

    public uploadUrl: string = "/api/upload/backlog";

    constructor(private service: BacklogService, public route: ActivatedRoute,
        private modalController: ModalController,
        private toastController: ToastController) {

    }

    ngOnInit() {

        this.backlogItems$ = this.route.parent.paramMap.pipe(
            switchMap(paramMap => {
                let orderId = paramMap.get('orderId');
                this.orderId = orderId;
                return this.service.get(orderId);
            }),
            catchError(err => {
                this.toast(err);
                return throwError(err);
            }),
            map(backlogs => {
                this.noBacklogItems = !backlogs || !backlogs.length;
                return this.noBacklogItems ? [] : _(backlogs).sortBy("orderDiaryType").groupBy(item => item.orderDiaryType).map(backlogs => {
                    return {
                        orderId: this.orderId,
                        orderDiaryType: backlogs[0].orderDiaryType,
                        orderDiaryContent: backlogs.map(i => i.orderDiaryContent).join("\n"),
                        createdAt: _.min(backlogs.map(i => i.createdAt)),
                        updatedAt: _.max(backlogs.map(i => i.updatedAt)),
                        diaryPicUrls: _(backlogs).flatMap(i => i.diaryPicUrls.map(p => (p && p.startsWith('http')) ? p : (environment.host + p))).value()
                    };
                }).value();
            })
        );
    }

    async createBacklog() {
        const modal = await this.modalController.create({
            component: BacklogModalComponent,
            componentProps: {
                orderId: this.orderId,
                content: "test"
            }
        });
        return await modal.present();
    }

    toast(message) {
        this.toastController.create({
            duration: 1500,
            message: message,
        }).then((toast) => {
            toast.present();
        });
    }

    uploadProgress($event) {
        console.log($event);
    }

    uploadComplete($event) {
        console.log($event);
    }

}
