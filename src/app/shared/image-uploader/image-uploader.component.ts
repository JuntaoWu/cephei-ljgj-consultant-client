import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ToastService } from 'app/services/providers';
import { File as NativeFile } from '@ionic-native/file/ngx';
import { ImageUploaderService } from './image-uploader.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  @Input() url: string;
  @Output() progress: EventEmitter<number> = new EventEmitter<number>();
  @Output() complete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private actionSheetController: ActionSheetController,
    private toastService: ToastService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private photoViewer: PhotoViewer,
    private nativeFile: NativeFile,
    private platform: Platform,
    private service: ImageUploaderService) {

  }

  ngOnInit() {
  }

  async presentUploadOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传图片',
      buttons: [
        {
          text: '拍照',
          icon: 'camera',
          handler: () => {
            console.log('TakePhoto clicked');
            this.takePhoto();
          }
        },
        {
          text: '从相册选取',
          icon: 'album',
          handler: () => {
            console.log('Album clicked');
            this.choosePhoto();
          }
        },
        {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  takePhoto() {
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
        const imageResult = await this.getNormalizedImage(imageData);
        this.service.upload(``, imageResult.file).subscribe(
          (progress: number) => {
            console.log(`upload ${imageResult.name} progress: ${progress}`);
            this.progress.emit(progress);
          },
          (error) => {
            console.error(`upload ${imageResult.name} error:`, error);
          },
          () => {
            console.log(`upload ${imageResult.name} completed.`);
            this.complete.emit(imageResult.src);
          });
      },
      error => {
        console.error(`Failed to load Camera ${error && error.message || error}`);

        this.toastService.show(`Failed to load Camera ${error && error.message || error}`);
      });
  }

  choosePhoto() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 9,
      width: 1280,
      height: 1280,
      quality: 100,
      outputType: 0,
    };

    this.imagePicker.getPictures(options).then(
      results => {
        if (results && results instanceof Array) {
          results.forEach(async element => {
            let imageResult = await this.getNormalizedImage(element);
            this.service.upload(``, imageResult.file).subscribe(
              (progress: number) => {
                console.log(`upload ${imageResult.name} progress: ${progress}`);
                this.progress.emit(progress);
              },
              (error) => {
                console.error(`upload ${imageResult.name} error:`, error);
              },
              () => {
                console.log(`upload ${imageResult.name} completed.`);
                this.complete.emit(imageResult.src);
              });
          });
        }
        else if (results && results == 'OK') {
          console.log('OK');
        }
      },
      error => {
        console.error(error);
        this.toastService.show(error && error.message || error || "获取图片失败");
      });
  }

  async getNormalizedImage(imageData: string) {
    let dataURI = "";
    let blob: Blob;
    let filename: string = "sample-image.jpg";

    if (imageData.startsWith("file:///")) {
      dataURI = imageData;
      let directory = imageData.substr(0, imageData.lastIndexOf("/"));
      filename = imageData.substr(imageData.lastIndexOf("/") + 1);
      let arrayBuffer = await this.nativeFile.readAsArrayBuffer(directory, filename);
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

}
