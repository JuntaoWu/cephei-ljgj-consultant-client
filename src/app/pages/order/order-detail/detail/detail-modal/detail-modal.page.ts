import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { OrderWork } from '../detail.model';

@Component({
    selector: 'modal-page',
    templateUrl:'detail-modal.page.html',
    styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {
    public orderwork:OrderWork;
    constructor(private navParams: NavParams,public popoverController : PopoverController){

    }
  ngOnInit() {
    // var iosstyle = document.querySelector('.popover-content.sc-ion-popover-ios');
    // iosstyle['style'].width = '80%';
    // iosstyle['left'] = '35px';
    // iosstyle['top'] = '200.275px';

    this.orderwork = this.navParams && this.navParams.get('orderWork') || {};
  }

  async confim(){
      await this.popoverController.dismiss(this.orderwork);
  }
}