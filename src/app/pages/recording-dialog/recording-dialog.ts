import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File as NativeFile } from '@ionic-native/file/ngx';
import { PlayerDialogPage } from '../pages';
import { ToastService } from '../../services/providers';
import { Platform } from '@ionic/angular';


@Component({
    selector: 'page-recording-dialog',
    templateUrl: 'recording-dialog.html'
})

export class RecordingDialogPage implements OnInit {
    private timer: any;
    private count: number;
    private hoursString: string;
    private minutesString: string;
    private secondsString: string;
    private mediaURL: string;
    private resovleUrl: string;
    private mediaObject: MediaObject;
    private fileName: string;
    private directory: string;

    public displayTime: string;
    public isStartRecord: boolean;
    public isStopRecord: boolean;
    public recordingList: Array<{ name: string, src: string, checked?: boolean, file?: Blob | File | string }> = [];
    public selectList: any[] = [];

    constructor(params: NavParams,
        private media: Media,
        private nativefile: NativeFile,
        private loadingCtrl: LoadingController,
        private modalCtrl: ModalController,
        private toastService: ToastService,
        private platform: Platform,
        private ngZone: NgZone) {

    }
    ngOnInit() {
        this.count = 0;
        this.hoursString = '';
        this.minutesString = '';
        this.secondsString = '';
        this.displayTime = '';
        this.isStartRecord = false;
        this.isStopRecord = true;
    }

    goBack() {
        this.modalCtrl.dismiss();
    }

    get platformMediaURL() {
        return this.platform.is('ios') ? this.mediaURL.replace(/^file:\/\//, '') : this.mediaURL;
    }

    startRecord() {
        this.isStartRecord = true;
        this.isStopRecord = false;
        var currentDate = new Date();

        const timestamp = currentDate.toJSON().substr(0, 20).replace(/[\.\:\-A-Z]/g, "");
        // this.fileName = currentDate.getFullYear().toString();

        // this.fileName = this.fileName + (((currentDate.getMonth() + 1) < 10) ? "0" + (currentDate.getMonth() + 1).toString() : (currentDate.getMonth() + 1).toString());

        // this.fileName = this.fileName + ((currentDate.getDate() < 10) ? "0" + currentDate.getDate().toString() : currentDate.getDate().toString());

        // this.fileName = this.fileName + ((currentDate.getHours() < 10) ? "0" + currentDate.getHours().toString() : currentDate.getHours().toString());

        // this.fileName = this.fileName + ((currentDate.getMinutes() < 10) ? "0" + currentDate.getMinutes().toString() : currentDate.getMinutes().toString());

        // this.fileName = this.fileName + ((currentDate.getSeconds() < 10) ? "0" + currentDate.getSeconds().toString() : currentDate.getSeconds().toString());

        this.fileName = `${timestamp}${this.platform.is('android') ? '.mp3' : '.m4a'}`;
        this.directory = this.nativefile.externalDataDirectory || this.nativefile.tempDirectory || this.nativefile.cacheDirectory || "";

        this.mediaURL = `${this.directory}${this.fileName}`;
        this.nativefile.createFile(this.directory, this.fileName, true).then(() => {
            this.mediaObject = this.media.create(this.platformMediaURL);
            this.mediaObject.onStatusUpdate.subscribe((status) => {
                console.log('UploadAudioPage.onStatusUpdate() -> Audio status: ' + status)
            });
            this.mediaObject.onSuccess.subscribe(() => {
                console.log('UploadAudioPage.onSuccess() -> sucess');
                this.mediaObject.release();
                this.count = 0;
            });

            this.mediaObject.onError.subscribe((error) => {
                console.log('UploadAudioPage.onError() -> Unexpected error: ' + JSON.stringify(error));
            });
            this.mediaObject.startRecord();
            this.timer = setInterval(() => {
                this.count = this.count + 1;
                var hours = Math.floor(this.count / 3600);
                var minutes = Math.floor((this.count - (hours * 3600)) / 60);
                var seconds = this.count - (hours * 3600) - (minutes * 60);
                this.hoursString = (hours < 10) ? "0" + hours : hours.toString();
                this.minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
                this.secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
                this.displayTime = this.hoursString + ":" + this.minutesString + ":" + this.secondsString;
            }, 1000);
        }).catch((err) => {
            console.error('create file failed' + err);
            this.timer && clearInterval(this.timer);
            this.isStartRecord = false;
            this.isStopRecord = true;
        });
    }

    stopRecord() {
        this.nativefile.resolveLocalFilesystemUrl(this.mediaURL).then(res => {
            try {
                this.mediaObject.stopRecord();

                clearInterval(this.timer);

                this.nativefile.readAsArrayBuffer(this.directory, this.fileName).then(voiceData => {

                    let blob = new Blob([voiceData], { type: this.platform.is('android') ? 'audio/aac' : 'audio/aac' });
                    this.ngZone.run(() => {
                        this.resovleUrl = res.toURL();
                        console.log(`Resolved url: ${this.resovleUrl}`);
                        this.isStartRecord = false;
                        this.isStopRecord = true;
                        this.recordingList.push({ name: this.fileName, src: this.resovleUrl, checked: false, file: blob });
                        this.toastService.show("录制完成", 1000);
                    });

                }).catch(error => {
                    this.toastService.show(error && error.message || error || "录制失败");
                });
            }
            catch (error) {
                this.toastService.show(error && error.message || error || "录制失败");
            }
        }).catch(error => {
            this.toastService.show(error && JSON.stringify(error));
        });
    }


    selectAll() {
        if (this.recordingList && this.recordingList.length > 0) {
            this.recordingList.forEach((item) => {
                item.checked = true;
            })

        }
    }

    cancelAll() {
        if (this.recordingList && this.recordingList.length > 0) {
            this.recordingList.forEach((item) => {
                item.checked = false;
            })

        }
    }

    async submit() {
        var unselectflag = true;
        let that = this;
        if (this.recordingList && this.recordingList.length > 0) {
            this.recordingList.forEach((item) => {
                if (item.checked) {
                    unselectflag = false;
                    that.selectList.push(item);
                }
            })
            if (unselectflag) {
                let loading = await this.loadingCtrl.create({
                    message: '请选择需要上传的音频文件',
                    duration: 2000
                });
                loading.present();
                return;
            }
            this.modalCtrl.dismiss(that.selectList);
        }
    }

    async playAudio(row) {
        let playerModal = await this.modalCtrl.create({ component: PlayerDialogPage, componentProps: { 'fliepath': row.src } });
        playerModal.present();
    }

}
