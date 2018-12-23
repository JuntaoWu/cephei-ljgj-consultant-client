import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api';
import { share, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Backlog } from './backlog.model';

@Injectable({
    providedIn: 'root'
})
export class BacklogService {

    constructor(public api: Api) {

    }

    get(orderId): Observable<Backlog[]> {
        return this.api.get(`backlog/${orderId}`).pipe(
            map(res => {
                console.log(res.message);
                if (res.code !== 0) {
                    console.error(res.message);
                    throw new Error(res.message);
                }

                if (!res.data) {
                    console.error("Invalid data response.");
                    throw new Error("Invalid data response.");
                }

                return res.data;
            }),
            catchError((err) => {
                console.error(err);
                return of([]);
            })
        );
    }
}

