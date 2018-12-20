import { Component, OnInit } from '@angular/core';
import { OrderItem } from './order.item';
import { OrderItems } from './moke-order-items';
import { Observable, fromEvent } from 'rxjs';
import { OrderListService } from './order-list.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'order-list',
    templateUrl: './order-list.page.html',
    styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

    public selectedIndex: number = 0;
    public tabs: string[];
    public orderItems$: Observable<OrderItem[]>[] = [];
    constructor(private service: OrderListService) {
        console.log('order-list');
    }

    ngOnInit() {
        this.tabs = ['全部', '审核中', '准备中', '施工中', '完成', '终止'];
        this.tabs.forEach((tab, index) => {
            this.orderItems$[index] = this.service.getMyOrderItems(index);
        });
    }

    changeType(index) {
        console.log("index: " + index);
        this.selectedIndex = index;
    }
}