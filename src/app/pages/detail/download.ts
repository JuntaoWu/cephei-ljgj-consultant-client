import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from '@ionic/angular';

import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserService, ToastService } from '../../services/providers';
import { NavParams } from '@ionic/angular';
import { File } from '@ionic-native/file';
import { environment } from '../../../environments/environment';
import { Api } from "../../services/api/api";
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';

declare var cordova: any;


@Component({
    selector: 'page-download',
    templateUrl: 'download.html'
})
export class DownloadPage implements OnInit {
    public imgsrc: string;
    constructor(public navCtrl: NavController,
        // private userService: UserService,
        // private navParams: NavParams,
        public modalCtrl: ModalController,
        // private file: File,
        // private api: Api,
        private toastService: ToastService,
        private photoLibary: PhotoLibrary) {
        //this.imgsrc = navParams.get('src');
    }

    async ngOnInit() {

    }

    downloadimg() {
        if (this.imgsrc.startsWith('file:///')) {
            this.toastService.show('该图片尚未提交，不支持保存');
            this.modalCtrl.dismiss();
            return;
        }

        if (!this.imgsrc.startsWith("http")) {
            this.imgsrc = `${environment.host}${this.imgsrc}`;
        }

        let filename = this.imgsrc.substr(this.imgsrc.lastIndexOf('/') + 1);
        console.log(this.imgsrc);

        this.photoLibary.requestAuthorization({
            read: true,
            write: true
        }).then(() => {
            this.photoLibary.saveImage(this.imgsrc, "VOS").then(result => {
                this.toastService.show('图片已保存至VOS/' + result.photoURL);
            }).catch(error => {
                this.toastService.show(error && error.message || error);
                console.error(error && error.message);
            });
        }).catch(error => {
            this.toastService.show(error && error.message || error);
            console.error(error && error.message);
        });

        // this.api.get(this.imgsrc, null, { responseType: 'blob' })
        //     .subscribe(res => {
        //         this.file.createDir(this.file.externalRootDirectory, 'VOS', true)
        //             .then(result => {
        //                 this.file.writeFile(this.file.externalRootDirectory + '/VOS/', filename, res)
        //                     .then(result => {
        //                         this.toastService.show('图片已保存至VOS/' + filename);
        //                     }).catch(err => {
        //                         if (err.message == 'PATH_EXISTS_ERR') {
        //                             this.toastService.show('已经保存过该文件至VOS/' + filename);
        //                         }
        //                         else {
        //                             this.toastService.show(err && err.message || err);
        //                         }
        //                         console.error(err && err.message || err);
        //                     });
        //             }).catch(error => {
        //                 this.toastService.show(error && error.message || error);
        //                 console.error(error && error.message || error);
        //             })
        //     }, error => {
        //         this.toastService.show(error && error.message || error);
        //         console.error(error && error.message);
        //     });

        this.modalCtrl.dismiss();
    }

}


