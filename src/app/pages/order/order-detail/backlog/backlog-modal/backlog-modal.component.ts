import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { BacklogService } from '../backlog.service';
import { Backlog, BacklogType } from '../backlog.model';

@Component({
  selector: 'app-backlog-modal',
  templateUrl: './backlog-modal.component.html',
  styleUrls: ['./backlog-modal.component.scss']
})
export class BacklogModalComponent implements OnInit {

  // "values" passed in componentProps
  @Input() orderId: string;
  @Input() backlogContent: string;
  public backlogType: BacklogType;

  public backlogTypeOptions: any[] = [
    { text: '联系用户', value: BacklogType.ContactUser },
    { text: '上门查看', value: BacklogType.VisitUser },
    { text: '准备施工', value: BacklogType.Preparing },
    { text: '正在施工', value: BacklogType.InProgress },
  ];

  public activeHref: string;

  constructor(private route: ActivatedRoute,
    private modal: ModalController,
    private toastController: ToastController,
    private service: BacklogService) {

  }

  ngOnInit() {
    this.activeHref = `/tabs/root/(order:order/${this.orderId}/backlog)`;
  }

  cancel() {
    this.modal.dismiss({
      result: "cancel"
    });
  }

  ok() {

    let dataToPost: Backlog = {
      orderId: this.orderId,
      backlogType: this.backlogType,
      backlogContent: this.backlogContent,
      imageUrls: [],
    };

    this.service.create(this.orderId, dataToPost).subscribe(
      (res) => {
        this.modal.dismiss({
          result: "ok"
        });
      },
      (err) => {
        this.toast(err);
      });
  }

  toast(message) {
    this.toastController.create({
      duration: 1500,
      message: message,
    }).then((toast) => {
      toast.present();
    });
  }

}
