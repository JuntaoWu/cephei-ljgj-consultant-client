import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  constructor() { 
    console.log('order-detail');
  }

  ngOnInit() {
  }

}