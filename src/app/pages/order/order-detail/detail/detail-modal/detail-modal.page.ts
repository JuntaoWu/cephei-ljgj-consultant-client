import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
    selector: 'modal-page',
    templateUrl:'detail-modal.page.html',
    styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {
    public serviceContent:string;
    constructor(private navParams: NavParams,public popoverController : PopoverController){

    }
  ngOnInit() {
    var iosstyle = document.querySelector('.popover-content.sc-ion-popover-ios');
    iosstyle['style'].width = '80%';
    //iosstyle['style'].height = '350px';
    iosstyle['left'] = '35px';
    iosstyle['top'] = '200.275px';

    this.serviceContent = this.navParams && this.navParams.get('content');
  }

  async confim(){
      await this.popoverController.dismiss(this.serviceContent);
  }
}