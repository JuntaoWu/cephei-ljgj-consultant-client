import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderItem } from '../order.item';
import { OrderItems } from './moke-order-items';
import { Observable, fromEvent, Subject, merge, BehaviorSubject, of } from 'rxjs';
import { map, distinctUntilChanged, filter, flatMap, tap, mergeAll, mergeMap, distinct } from 'rxjs/operators';
import * as _ from 'lodash';
import { LoadingController } from '@ionic/angular';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
    selector: 'order-list',
    templateUrl: './order-list.page.html',
    styleUrls: ['./order-list.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListPage implements OnInit {

    public selectedIndex: number = 0;
    public tabs: string[] = ['全部', '审核中', '准备中', '施工中', '完成', '终止'];

    private loadMoreSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(0);
    private changeTypeSubject$: BehaviorSubject<any> = new BehaviorSubject(0);
    private refreshSubject$: BehaviorSubject<any> = new BehaviorSubject(0);

    private pageByChangeType$: Observable<number>;
    private pageByLoadMore$: Observable<number>;
    private pageByRefresh$: Observable<number>;

    private pageToLoad$: Observable<any>;

    private itemsPerPage: number = 10;
    private currentPageByStatus: number[] = [];
    private totalItemsByStatus: number[] = [];
    private cacheByStatus: OrderItem[][][] = [];
    public orderItems$: Observable<OrderItem[]>;

    private ionInfiniteEvent: any;

    constructor(private service: OrderService, private loadingCtrl: LoadingController, private router: Router) {
        console.log('order-list');
    }

    doRefresh($event) {
        // clear current cached data.
        this.refreshSubject$.next(0);
        this.cacheByStatus[this.selectedIndex] = [];
        this.currentPageByStatus[this.selectedIndex] = 1;

        // now doRefresh:
        this.refreshSubject$.next(1);
        setTimeout(() => {
            console.log('Async operation has ended');
            $event.target.complete();
        }, 1000);
    }

    ngOnInit() {
        this.tabs.forEach((tab, index) => {
            this.currentPageByStatus[index] = 1;
            //this.orderItems$[index] = this.service.getMyOrderItems(index).pipe(map(resp => resp.items));
        });

        this.pageByChangeType$ = this.changeTypeSubject$.pipe(
            map((status) => {
                console.log("pageByChangeType$", this.currentPageByStatus[status]);
                return Math.ceil(this.currentPageByStatus[status]);
            }),
            distinct()
        );

        this.pageByLoadMore$ = this.loadMoreSubject$.pipe(
            distinctUntilChanged(),
            filter((event) => {
                const shouldLoadMore = this.currentPageByStatus[this.selectedIndex] * this.itemsPerPage < this.totalItemsByStatus[this.selectedIndex];
                if (!shouldLoadMore) {
                    event && event.target && event.target.complete();
                }
                return shouldLoadMore;
            }),
            map((event) => {
                console.log("pageByLoadMore$", this.currentPageByStatus[this.selectedIndex] + 1);
                return Math.ceil(this.currentPageByStatus[this.selectedIndex] + 1);
            })
        );

        this.pageByRefresh$ = this.refreshSubject$.pipe(
            map((event) => {
                console.log("pageByRefresh$", event);
                return Math.ceil(event);
            })
        );

        this.pageToLoad$ = merge(this.pageByChangeType$, this.pageByLoadMore$, this.pageByRefresh$).pipe(distinctUntilChanged());

        this.orderItems$ = this.pageToLoad$
            .pipe(
                filter((page: number) => {
                    console.log("filter", page);
                    return page > 0;
                }),
                mergeMap((page: number) => {
                    if (!this.cacheByStatus[this.selectedIndex] || !this.cacheByStatus[this.selectedIndex][page - 1]) {
                        // get my orderItems via service.
                        return this.service.getMyOrderItems(this.selectedIndex, page)
                            .pipe(
                                tap(resp => {
                                    // add the page to the cache
                                    this.cacheByStatus[this.selectedIndex] = this.cacheByStatus[this.selectedIndex] || [];
                                    this.cacheByStatus[this.selectedIndex][page - 1] = resp.items;
                                    this.totalItemsByStatus[this.selectedIndex] = resp.totalItems;
                                    this.currentPageByStatus[this.selectedIndex] = page;
                                })
                            );
                    }
                    else {
                        return of({});
                    }
                }),
                // eventually, just return a stream that contains the cache
                map(() => {
                    console.log("eventually");
                    this.ionInfiniteEvent && this.ionInfiniteEvent.target && this.ionInfiniteEvent.target && this.ionInfiniteEvent.target.complete();
                    return _.flatMap(this.cacheByStatus[this.selectedIndex]);
                })
            );
    }

    public async changeType(index) {
        console.log("selectedIndex:", this.selectedIndex, index);
        this.changeTypeSubject$.next(index);
    }

    public loadMore(event) {
        console.log("loadMore called.");
        this.ionInfiniteEvent = event;
        this.loadMoreSubject$.next(event);
    }

    public detail(orderNo: string) {
        this.router.navigateByUrl(`/tabs/root/order/${orderNo}`);
    }
}