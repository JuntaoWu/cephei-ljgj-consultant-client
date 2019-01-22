import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BacklogService } from '../backlog.service';
import { Backlog, BacklogType } from '../backlog.model';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ToastService } from 'app/services/providers';

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

  public uploadUrl: string = "/api/upload/backlog";

  public images: any[] = [];

  public backlogTypeOptions: any[] = [
    { text: '联系用户', value: BacklogType.ContactUser },
    { text: '上门查看', value: BacklogType.VisitUser },
    { text: '准备施工', value: BacklogType.Preparing },
    { text: '正在施工', value: BacklogType.InProgress },
  ];

  public activeHref: string;

  constructor(private route: ActivatedRoute,
    private modal: ModalController,
    private toastService: ToastService,
    private photoViewer: PhotoViewer,
    private service: BacklogService) {

  }

  ngOnInit() {
    this.activeHref = `/tabs/root/(order:order/${this.orderId}/backlog)`;
  }

  cancel() {
    this.modal.dismiss({
      result: "cancel",
      role: "cancel",
    });
  }

  ok() {

    let dataToPost: Backlog = {
      orderId: this.orderId,
      orderDiaryType: this.backlogType,
      orderDiaryContent: this.backlogContent,
      diaryPicUrls: this.images,
    };

    this.service.create(this.orderId, dataToPost).subscribe(
      (res) => {
        this.modal.dismiss({
          result: "ok"
        });
      },
      (err) => {
        this.toastService.show(err);
      });
  }

  public imagesChange($event) {
    console.log($event);
    console.log(this.images && this.images.length);
  }

  public showImage(url: string) {
    this.photoViewer.show(url);
  }

}
