import { Component, OnInit } from '@angular/core';
import { Backlog } from './backlog.model';
import { BacklogService } from './backlog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { BacklogModalComponent } from './backlog-modal/backlog-modal.component';

import * as _ from 'lodash';
import { environment } from 'environments/environment';
import { ToastService } from 'app/services/providers';

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

    constructor(private service: BacklogService,
        private toastService: ToastService,
        public route: ActivatedRoute,
        private modalController: ModalController) {

    }

    ngOnInit() {
        this.route.parent.paramMap.subscribe(
            (paramMap) => {
                let orderId = paramMap.get('orderId');
                this.orderId = orderId;
                return this.orderId;
            }
        );

        this.postInit();
    }

    public postInit() {
        this.backlogItems$ = this.service.get(this.orderId).pipe(
            catchError(err => {
                this.toastService.show(err);
                return throwError(err);
            }),
            map(backlogs => {
                this.noBacklogItems = !backlogs || !backlogs.length;
                return this.noBacklogItems ? [] : _(backlogs).sortBy("orderDiaryType").groupBy(item => item.orderDiaryType).map(backlogs => {
                    return {
                        orderId: this.orderId,
                        orderDiaryType: backlogs[0].orderDiaryType,
                        orderDiaryContentList: backlogs.map(i => i.orderDiaryContent),
                        createdAt: _.min(backlogs.map(i => i.createdAt)),
                        updatedAt: _.max(backlogs.map(i => i.updatedAt)),
                        diaryPicUrls: _(backlogs).flatMap(i => i.diaryPicUrls.map(p => (p && p.startsWith('http')) ? p : (environment.host + p))).value()
                    };
                }).value();
            })
        );
    }

    public async createBacklog() {
        const modal = await this.modalController.create({
            component: BacklogModalComponent,
            componentProps: {
                orderId: this.orderId,
            }
        });
        modal.onDidDismiss()
            .then((result) => {
                if (!result || result.role === 'cancel') {
                    return;
                }
                this.postInit();
            })
            .catch((error) => {
                console.error(error);
            });
        return await modal.present();
    }

}
