import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  public links = [
    { path: 'detail', label: '订单详情' },
    { path: 'backlog', label: '任务日志' },
    { path: 'payment', label: '订单金额' }
  ];

  public activeLink = this.links[0].path;

  constructor() {
    console.log('order-detail');
  }

  ngOnInit() {

  }

}