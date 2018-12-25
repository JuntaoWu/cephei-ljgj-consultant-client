import { Component, OnInit } from '@angular/core';
import { Payment } from './payment.model';
import { OrderPaymentType } from '../../../../types/order-payment-type.enum';
import { OrderPaymentStatus } from '../../../../types/order-payment-status.enum';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PaymentModalPage } from './payment-modal/payment-modal.page';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  public orderId:string;
  constructor(public popoverController: PopoverController,public route: ActivatedRoute) { }
  public paymentItems: Payment[];
  ngOnInit() {
    this.route.parent.paramMap.subscribe((p)=>{
      this.orderId = p.get("orderId");
    })
    this.paymentItems = [
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 450, "paymentStatus": OrderPaymentStatus.Initializing },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 150, "paymentStatus": OrderPaymentStatus.Closed },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 250, "paymentStatus": OrderPaymentStatus.Completed },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 350, "paymentStatus": OrderPaymentStatus.Exception },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 550, "paymentStatus": OrderPaymentStatus.Waiting },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 650, "paymentStatus": OrderPaymentStatus.Initializing },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 750, "paymentStatus": OrderPaymentStatus.Closed },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 850, "paymentStatus": OrderPaymentStatus.Completed },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 950, "paymentStatus": OrderPaymentStatus.Exception },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 1050, "paymentStatus": OrderPaymentStatus.Waiting },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 450, "paymentStatus": OrderPaymentStatus.Initializing },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 150, "paymentStatus": OrderPaymentStatus.Closed },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 250, "paymentStatus": OrderPaymentStatus.Completed },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 350, "paymentStatus": OrderPaymentStatus.Exception },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 550, "paymentStatus": OrderPaymentStatus.Waiting },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 650, "paymentStatus": OrderPaymentStatus.Initializing },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 750, "paymentStatus": OrderPaymentStatus.Closed },
      { "orderId": "0001", "paymentType": OrderPaymentType.MaterialCost, "amount": 850, "paymentStatus": OrderPaymentStatus.Completed },
      { "orderId": "0001", "paymentType": OrderPaymentType.OtherCost, "amount": 950, "paymentStatus": OrderPaymentStatus.Exception },
      { "orderId": "0001", "paymentType": OrderPaymentType.ConstructionCost, "amount": 1050, "paymentStatus": OrderPaymentStatus.Waiting },
    ]
  }

  generateColor(item):string {
    let result = '';
    if(item){
      switch (+item.paymentStatus) {
        case OrderPaymentStatus.Initializing:
            result = 'status-red-color';
            break;
        case OrderPaymentStatus.Waiting:
            result = 'status-red-color';
            break;
        case OrderPaymentStatus.Completed:
            result = 'status-green-color';
            break;
        case OrderPaymentStatus.Closed:
            result = 'status-green-color';
            break;
        case OrderPaymentStatus.Exception:
            result = 'status-red-color';
            break;
    }
    }
    return result;
  }

  async paymentCreatePrompt(){
    const modal = await this.popoverController.create({
      component:PaymentModalPage,
      translucent: true,
      componentProps:{'orderId':this.orderId}
    });
    modal.onDidDismiss().then((result:any)=>{
      console.log("serviceContent: " + result.data);
      if(result.data && result.data.paymentType && result.data.amount && result.data.amount != ""   ){
        this.paymentItems.push(result.data);
      }
     
    })
    return await modal.present();
  }
}
