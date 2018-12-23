import { Component, OnInit } from '@angular/core';
import { Backlog } from './backlog.model';
import { BacklogService } from './backlog.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-backlog',
    templateUrl: './backlog.page.html',
    styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {

    public noBacklogItems: boolean;
    public backlogItems$?: Observable<Backlog[]>;

    constructor(private service: BacklogService, public route: ActivatedRoute) {

    }

    ngOnInit() {

        this.backlogItems$ = this.route.parent.paramMap.pipe(
            switchMap(paramMap => {
                let orderId = paramMap.get('orderId');
                return this.service.get(orderId);
            }),
            map(backlogs => {
                this.noBacklogItems = !backlogs || !backlogs.length;
                return backlogs;
            })
        );
    }

}
