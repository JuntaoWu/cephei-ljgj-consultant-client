import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {

  constructor() { 
    console.log('order-list');
  }

  ngOnInit() {
  }

}