import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, Platform, AlertController, PopoverController, IonSlides as Slides } from '@ionic/angular';

import { OnInit } from '@angular/core';
import { UserService, ToastService } from '../../services/providers';
import { NavParams } from '@ionic/angular';
import { TaskType } from '../../shared/task-type';
import { LoadingController } from '@ionic/angular';
import { TaskDetailService } from './detail.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { environment } from '../../../environments/environment';
import { Tab1Root, TabsPage, RecordingDialogPage, PlayerDialogPage, DownloadPage } from '../pages';
import { TaskStore } from '../../services/stores/task.store';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File as NativeFile } from '@ionic-native/file/ngx';


declare var cordova: any;


@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html'
})
export class DetailPage implements OnInit {
    @ViewChild(Slides) slides: Slides;

    public clientType = environment.clientType;

    private workId: string;
    private process: number;
    private taskType: TaskType;
    private indexId: any;
    public stepCompleted: boolean = false;
    public taskCompleted: boolean = false;
    public name: string;
    public images: Array<{ src: string, name: string, file?: Blob | File | string }> = [];
    public reviewimages: Array<{ src: string, name: string, file?: Blob | File | string }> = [];
    public detail: any = { message: "" };
    private actionSheet: any;
    public mediaObject: MediaObject;
    public mediaURL: string;
    public resovleUrl: string;
    public recordingList: Array<{ src: string, name: string, file?: Blob | File | string }> = [];
    public step: any;
    public isUpdate: boolean;
    public isManagerCamera: boolean = false;
    public managerCameraTime: string = '';
    public isClientCamera: boolean = false;
    public clientCameraTime: string = '';

    private retryStoragePermissionTimes = 0;

    constructor(public navCtrl: NavController,
        private userService: UserService,
        private navParams: NavParams,
        private loadingCtrl: LoadingController,
        private api: TaskDetailService,
        private toastService: ToastService,
        private camera: Camera,
        private actionSheetCtrl: ActionSheetController,
        private imagepicker: ImagePicker,
        private photoViewer: PhotoViewer,
        private taskStore: TaskStore,
        private media: Media,
        private nativefile: NativeFile,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private platform: Platform,
        private popoverCtrl: PopoverController) {

        let params = this.navParams.data;
        this.workId = params && params.workId;
        this.process = params && params.process;
        this.taskType = params && params.taskType;
        this.indexId = params && params.indexId;
        this.stepCompleted = params && params.stepCompleted;
        this.taskCompleted = params && params.taskCompleted;
        this.name = params && params.name;
        this.step = params && params.step;
        this.images = [];
        this.reviewimages = [];
        this.isUpdate = (this.clientType != 'Management') && (!this.taskCompleted && (this.step.enableUpdate || !this.stepCompleted));
        this.isManagerCamera = false;
    }

    async ngOnInit() {
        if (!this.userService.user) {
            console.log("User unauthenticated.");
            return;
        }

        this.stepCompleted && this.loadTaskDetail();
    }

    async loadTaskDetail() {

        let loading = await this.loadingCtrl.create({
            message: '任务流程详情'
        });

        loading.present().then(() => {

            this.api.getTaskDetail(this.userService.phoneNo, this.workId, this.process, this.taskType, this.indexId)
                .subscribe((resp: any) => {
                    console.log("Fetch task detail successfully");

                    loading.dismiss();

                    this.toastService.show(resp.msg);

                    if (resp.workdetail) {
                        this.detail = resp.workdetail;
                        if (this.clientType == 'Management') {
                            this.isClientCamera = true;
                            this.clientCameraTime = this.detail.picturetime;
                        }

                        if (this.detail.picturetime1 != '0000-00-00 00:00:00' && this.detail.picturetime1 != 'null') {
                            this.isManagerCamera = true;
                            console.log('picturetime1: ' + this.detail.picturetime1);
                            console.log('isManagerCamera: ' + this.isManagerCamera);
                            this.managerCameraTime = this.detail.picturetime1
                        }

                        this.images = this.detail && this.detail.imgurl instanceof Array
                            && this.detail.imgurl.map(url => {
                                return { src: environment.host + url, name: url.substr(url.lastIndexOf('/') + 1) };
                            }) || [];
                        this.reviewimages = this.detail && this.detail.imgurlg instanceof Array
                            && this.detail.imgurlg.map(url => {
                                return { src: environment.host + url, name: url.substr(url.lastIndexOf('/') + 1) };
                            }) || [];
                        this.recordingList = this.detail && this.detail.voice_url instanceof Array
                            && this.detail.voice_url.map(url => {
                                return { src: environment.host + url, name: url.substr(url.lastIndexOf('/') + 1) };
                            }) || [];
                    }
                },
                    (error) => {
                        loading.dismiss();
                        this.toastService.show(error && error.message || error || "获取任务详情失败");
                    });
        });
    }

    showActionSheets() {
        this.actionSheet = this.actionSheetCtrl.create({
            buttons: this.generateActionSheets()
        });
        this.actionSheet.present();
    }

    async getNormalizedImage(imageData: string) {
        let dataURI = "";
        let blob: Blob;
        let filename: string = "sample-image.jpg";

        if (imageData.startsWith("file:///")) {
            dataURI = imageData;
            let directory = imageData.substr(0, imageData.lastIndexOf("/"));
            filename = imageData.substr(imageData.lastIndexOf("/") + 1);
            let arrayBuffer = await this.nativefile.readAsArrayBuffer(directory, filename);
            blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        }
        else {
            dataURI = 'data:image/jpeg;base64,' + imageData;
            blob = this.dataURIToBlob(dataURI);
        }

        return {
            src: this.platform.is("ios") ? dataURI.replace(/^file:\/\//, '') : dataURI,
            file: blob,
            name: filename,
            viewSrc: dataURI
        };
    }

    takePhoto() {
        let currentDate = new Date();
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1280,
            targetHeight: 1280,
            saveToPhotoAlbum: false,
            correctOrientation: true,
        };

        this.camera.getPicture(options).then(
            async imageData => {
                let imageResult = await this.getNormalizedImage(imageData);
                this.images.unshift(imageResult);
                this.clientCameraTime = this.generateTakePhoneTime();
            },
            error => {
                console.error(`Failed to load Camera ${error && error.message || error}`);
                this.toastService.show(`Failed to load Camera ${error && error.message || error}`);
            });
    }

    takeManagePoto() {
        let currentDate = new Date();

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1280,
            targetHeight: 1280,
            saveToPhotoAlbum: true,
            correctOrientation: true,
        };

        this.camera.getPicture(options).then(
            async imageData => {
                let imageResult = await this.getNormalizedImage(imageData);
                this.images.unshift(imageResult);
                this.isManagerCamera = true;
                this.managerCameraTime = this.generateTakePhoneTime();
                console.log('this.managerCameraTime :' + this.managerCameraTime);
            },
            error => {
                console.error(error);
                this.toastService.show(`Failed to load Camera ${error && error.message || error}`);
            });
    }

    takeReviewPhoto() {
        let currentDate = new Date();

        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 1280,
            targetHeight: 1280,
            saveToPhotoAlbum: true,
            correctOrientation: true,
        };

        this.camera.getPicture(options).then(
            async imageData => {
                let imageResult = await this.getNormalizedImage(imageData);
                this.reviewimages.unshift(imageResult);
                console.log('reviewimages: ' + JSON.stringify(this.reviewimages));
            },
            error => {
                console.error(error);
                this.toastService.show(`Failed to load Camera ${error && error.message || error}`);
            });
    }

    selectPhoto() {
        const options: ImagePickerOptions = {
            maximumImagesCount: 9,
            width: 1280,
            height: 1280,
            quality: 100,
            outputType: 0,
        };

        this.imagepicker.getPictures(options).then(
            results => {
                if (results && results instanceof Array) {
                    results.forEach(async element => {
                        let imageResult = await this.getNormalizedImage(element);
                        this.images.unshift(imageResult);
                    });
                    this.clientCameraTime = this.generateTakePhoneTime();
                }
                else if (results && results == 'OK') {
                    console.log('OK');
                    if (++this.retryStoragePermissionTimes < environment.maxRetryCount) {
                        this.selectPhoto();
                    }
                }
            },
            error => {
                console.error(error);
                this.toastService.show(error && error.message || error || "获取图片失败");
            });
    }

    showPicture(img) {
        this.photoViewer.show(img.viewSrc || img.src);
    }

    dataURIToBlob(dataURI: string) {
        const regexp = /data:(.*);base64,(.*)/;
        if (!regexp.test(dataURI)) {
            return null;
        }

        let group = dataURI.match(regexp);
        let mimeType = group[1];
        let base64String = group[2];
        let arrayBuffer = window.atob(base64String);
        let n = arrayBuffer.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
            uint8Array[n] = arrayBuffer.charCodeAt(n);
        }
        let blob = new Blob([uint8Array], { type: mimeType });
        console.log(`dataURIToBlob, blob size: ${blob.size}`);
        return blob;
    }

    async saveTaskDetail() {
        let form = new FormData();
        form.append("phone", this.userService.phoneNo);
        form.append("work_id", this.workId);
        this.process && form.append("process", this.process.toString());
        form.append("content", this.detail.content || " ");
        form.append("address", this.detail.address);
        form.append("lat", this.detail.lat);
        form.append("lng", this.detail.lng);
        form.append("picturetime", this.detail.picturetime);
        form.append("picturetime1", this.detail.picturetime1);
        form.append("ordertype", this.taskType.toString());
        this.indexId !== undefined && form.append("indexid", this.indexId);
        form.append('picturetime', this.clientCameraTime);
        form.append("picturetime1", this.managerCameraTime);

        this.buildBlobData(form, "details_img", "del_img", this.images || [], this.detail && this.detail.imgurl || []);

        if (!(this.detail.voice_url instanceof Array)) {
            this.detail.voice_url = [];
        }
        this.buildBlobData(form, "details_voice", "del_voice", this.recordingList || [], this.detail.voice_url);

        if (!(this.detail.imgurlg instanceof Array)) {
            this.detail.imgurlg = [];
        }
        this.buildBlobData(form, "detailsG_img", "del_imgG", this.reviewimages || [], this.detail && this.detail.imgurlg || []);

        // console.log(`lat: ${this.detail.lat}, lng: ${this.detail.lng}`);
        // console.log(`form details_voice1 ${form.get('details_voice1')}`)
        if (!environment.production || this.validateSave()) {
            let confirm = await this.alertCtrl.create({
                message: this.step.savingTips,
                buttons: [
                    {
                        text: '取消',
                        handler: () => {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: '确认',
                        handler: async () => {
                            let loading = await this.loadingCtrl.create({
                                message: '数据上传中...'
                            });
                            loading.present().then(() => {
                                this.api.saveTaskDetail(form).subscribe(
                                    (resp: any) => {
                                        loading.dismiss();
                                        this.toast(resp.msg);
                                        if (resp.status == "true") {
                                            this.taskStore.setCurrentTask({ id: this.workId });
                                            throw "not implemented";
                                            // this.navCtrl.pop();
                                            // deprecated this.navCtrl.setRoot(TabsPage, { taskType: this.taskType });
                                        }
                                    },
                                    error => {
                                        loading.dismiss();
                                        let message = (error.message == null || error.message == '') ? '数据上传失败' : error.message;
                                        this.toast(message);
                                    });
                            });

                        }
                    }
                ]
            });
            confirm.present();
        }

    }

    buildBlobData(form, nameAdd, nameDel, local: any[], origin: any[]) {
        local.filter(obj => obj.file).forEach((obj, index) => {
            console.log(`Append file: ${obj.name} to ${nameAdd}${index + 1}, size: ${obj.file.size}, type: ${JSON.stringify(obj.file.type)}`);
            form.append(`${nameAdd}${index + 1}`, obj.file, obj.name);
        });

        let deleted = origin.filter(url => {
            return !local.find(obj => obj.src.includes(url));
        }).join(",");
        deleted && form.append(nameDel, deleted);
    }

    protected toast(message: any) {
        this.toastService.show(message);
    }

    async takeMedia() {
        let recordingModal = await this.modalCtrl.create({ component: RecordingDialogPage });
        recordingModal.onDidDismiss().then(res => {
            if (res && res.data.length > 0) {
                res.data.forEach((item) => {
                    this.recordingList.push(item);
                });
            }
        });
        recordingModal.present();
    }

    async playAudio(row) {
        let playerModal = await this.modalCtrl.create({ component: PlayerDialogPage, componentProps: { 'filepath': row.src } });
        playerModal.present();
    }

    startMedia() {
        this.mediaURL = this.nativefile.externalDataDirectory + 'my_file.mp3';
        this.nativefile.createFile(this.nativefile.externalDataDirectory, 'my_file.mp3', true).then(() => {
            this.mediaObject = this.media.create(this.nativefile.externalDataDirectory + 'my_file.mp3');
            this.mediaObject.onStatusUpdate.subscribe((status) => {
                console.log('UploadAudioPage.onStatusUpdate() -> Audio status: ' + status)
            });
            this.mediaObject.onSuccess.subscribe(() => {
                console.log('UploadAudioPage.onSuccess() -> sucess');
                this.mediaObject.release();
            });

            this.mediaObject.onError.subscribe((error) => {
                console.log('UploadAudioPage.onError() -> Unexpected error: ' + JSON.stringify(error));
            });
            this.mediaObject.startRecord();
        }).catch((err) => {
            console.log('create file failed' + err);
        })
    }

    stopMedia() {
        this.mediaObject.stopRecord();
        this.nativefile.resolveLocalFilesystemUrl(this.mediaURL).then(res => {
            this.resovleUrl = res.toURL();
            console.log(this.resovleUrl);
        }).catch(error => {
            console.log('Catach: ' + JSON.stringify(error));
        })
    }

    playMedia() {
        this.mediaObject = this.media.create(this.mediaURL);
        this.mediaObject.onSuccess.subscribe(() => {
            console.log('playMedia.onSuccess() -> Audio Success');
        });

        this.mediaObject.onError.subscribe((error) => {
            console.log('playMedia.onError() -> Audio error: ' + JSON.stringify(error));
        });
        this.mediaObject.play();
    }

    generateActionSheets(): any {
        let customerbuttons = [];
        if (this.step.enableCamera) {
            customerbuttons.push({
                text: '拍照',
                role: 'destructive',
                handler: () => {
                    this.takePhoto();
                    return true;
                }
            });
        }
        if (this.step.enableGalleray) {
            customerbuttons.push({
                text: '从相册中选取',
                handler: () => {
                    this.selectPhoto();
                    return true;
                }
            });
        }
        if (this.step.showManagerCamera) {
            customerbuttons.push({
                text: '管理员拍照',
                handler: () => {
                    if (this.step.enableManagerCamera) {
                        this.takeManagePoto();
                        return true;
                    } else {
                        return false;
                    }

                }
            });
        }
        if (this.step.showRecording) {
            customerbuttons.push({
                text: '选取音频文件',
                handler: () => {
                    if (this.step.enableRecording) {
                        this.takeMedia();
                        return true;
                    } else {
                        return false;
                    }

                }
            });
        }
        if (this.step.showReviewCamera) {
            customerbuttons.push({
                text: '整改情况拍照',
                handler: () => {
                    if (this.step.enableReviewCamera) {
                        this.takeReviewPhoto();
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        }
        customerbuttons.push({
            text: '取消',
            role: '取消',
            handler: () => {
                console.log('Cancel clicked');
            }
        });
        return customerbuttons;
    }

    validateSave(): any {
        var result = true;
        if (this.step.requirePhoto) {
            if (this.images && this.images.length) {
                if (this.step.enableRecording && this.step.requireAudio) {
                    if (this.recordingList && this.recordingList.length) {
                        return result;
                    } else {
                        this.toastService.show('作业流程：请选择音频后，再保存信息', 1000, 'middle');
                        result = false;
                        return result;
                    }
                } else {
                    return result;
                }
            } else {
                this.toastService.show('作业流程：请选择图片后，再保存信息', 1000, 'middle');
                result = false;
                return result;
            }
        }
        return result;
    }

    generateTakePhoneTime(): string {
        var result = '';
        var currentDate = new Date();
        result = currentDate.getFullYear().toString();
        result = result + '-' + (((currentDate.getMonth() + 1) < 10) ? "0" + (currentDate.getMonth() + 1).toString() : (currentDate.getMonth() + 1).toString());
        result = result + '-' + ((currentDate.getDate() < 10) ? "0" + currentDate.getDate().toString() : currentDate.getDate().toString());
        result = result + ' ' + ((currentDate.getHours() < 10) ? "0" + currentDate.getHours().toString() : currentDate.getHours().toString());
        result = result + ':' + ((currentDate.getMinutes() < 10) ? "0" + currentDate.getMinutes().toString() : currentDate.getMinutes().toString());
        result = result + ':' + ((currentDate.getSeconds() < 10) ? "0" + currentDate.getSeconds().toString() : currentDate.getSeconds().toString());
        return result;
    }

    pressed(img) {
        console.log('pressed');
        throw "not implemented";
        // let popover = this.popoverCtrl.create(DownloadPage, { src: img.viewSrc || img.src });
        // popover.present();
    }
}
