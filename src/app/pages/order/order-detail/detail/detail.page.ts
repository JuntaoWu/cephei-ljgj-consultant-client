import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../order.item';
import { PopoverController, ToastController } from '@ionic/angular';
import { OrderItems } from '../../order-list/moke-order-items';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailModalPage } from './detail-modal/detail-modal.page';
import { OrderDetailService } from './detail.service';
import { OrderDetail } from './detail.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  //private orderId$: Observable<string>;
  private orderId

  public orderdetail: OrderDetail;
  public servicecontents: string[] = [];

  constructor(public popoverController: PopoverController, public route: ActivatedRoute, public service: OrderDetailService, public toastController: ToastController) {

    /*this.orderId$ = route.parent.paramMap.pipe(map(p => {
      return p.get("orderId");
    }));
    this.orderId$.subscribe(orderId => {
      console.log('order-detail: orderId from parent:', orderId);
    }).unsubscribe();*/
  }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(p => {
      this.orderId = p.get("orderId");
    });
    this.service.get(this.orderId).subscribe(res => {
      console.log("res: " + JSON.stringify(res));
      this.orderdetail = res;
      console.log(this.orderdetail.orderWorkList)
    })

  }

  async presentCreatePrompt() {
    const modal = await this.popoverController.create({
      component: DetailModalPage,
      translucent: true,
      cssClass: 'popover-form'
    });
    modal.onDidDismiss().then((result: any) => {
      if (!result || !result.data) {
        return;
      }

      if (result.role === 'cancel') {
        return;
      }

      console.log("serviceContent: " + result.data);
      if (result.data.orderWork) {
        this.service.createOrderWork(this.orderId, result.data.orderWork).subscribe(
          res => {
            this.orderdetail.orderWorkList.push(res);
          },
          error => {
            this.showErrorMessage(error)
          });
      }

    })
    return await modal.present();
  }

  async presentEditPrompt(orderWork, cardIndex) {

    const modal = await this.popoverController.create({
      component: DetailModalPage,
      translucent: true,
      componentProps: { 'orderWork': { ...orderWork } },
      cssClass: 'popover-form'
    });
    modal.onDidDismiss().then((result: any) => {
      if (!result || !result.data) {
        return;
      }

      if (result.role === 'cancel') {
        return;
      }

      console.log("serviceContent: " + result.data.orderWork);
      if (result.data.orderWork) {
        this.service.updateOrderWork(result.data.orderworkid, result.data.orderWork).subscribe(
          res => {
            this.orderdetail.orderWorkList[cardIndex] = res;
          },
          error => {
            this.showErrorMessage(error)
          });
      }

    })
    return await modal.present();
  }

  showErrorMessage(error) {
    this.toastController.create({
      message: error,
      duration: 1500
    }).then(totaset => {
      totaset.present();
    })
  }

}
