import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../order.item';
import { PopoverController } from '@ionic/angular';
import { OrderItems } from '../../order-list/moke-order-items';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetailModalPage } from './detail-modal/detail-modal.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  private orderId$: Observable<string>;

  public item: OrderItem;
  public servicecontents:string[] = [];

  constructor(public popoverController: PopoverController, public route: ActivatedRoute) {

    this.orderId$ = route.parent.paramMap.pipe(map(p => {
      return p.get("orderId");
    }));
    this.orderId$.subscribe(orderId => {
      console.log('order-detail: orderId from parent:', orderId);
    }).unsubscribe();
  }

  ngOnInit() {
    this.item = OrderItems[0];
  }

  async presentCreatePrompt() {
    const modal = await this.popoverController.create({
      component:DetailModalPage,
      translucent: true,
    });
    modal.onDidDismiss().then((result:any)=>{
      console.log("serviceContent: " + result.data);
      if(result.data){
        this.servicecontents.push(result.data);
      }
     
    })
    return await modal.present();
  }

  async presentEditPrompt(cardIndex){

    const modal = await this.popoverController.create({
      component:DetailModalPage,
      translucent: true,
      componentProps:{'content':this.servicecontents[cardIndex]}
    });
    modal.onDidDismiss().then((result:any)=>{
      console.log("serviceContent: " + result.data);
      if(result.data){
        this.servicecontents[cardIndex] = result.data;
      }
     
    })
    return await modal.present();
  }

}
