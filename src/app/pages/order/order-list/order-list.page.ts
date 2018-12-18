import { Component, OnInit } from '@angular/core';
import {OrderItem} from './order.item';
import {OrderItems} from './moke-order-items';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  public tabs:string[];
  public orderItems:OrderItem[];
  constructor() { 
    console.log('order-list');
  }

  ngOnInit() {
    this.tabs = ['全部', '准备中', '施工中','完成','终止'];
    this.orderItems = OrderItems;
  }

  changeType(index){
    console.log("index: " + index);
  }
}