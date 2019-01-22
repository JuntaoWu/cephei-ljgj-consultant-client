import { Component, OnInit, Input, Output, EventEmitter, Sanitizer, SecurityContext } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { MulterFile } from 'app/types/multer-file';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-bar',
  templateUrl: './image-bar.component.html',
  styleUrls: ['./image-bar.component.scss']
})
export class ImageBarComponent implements OnInit {

  @Input() readonly;
  @Input() uploadUrl: string;
  @Input() images: string[];

  @Output() imagesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  public uploading = false;
  public uploadingImage: SafeUrl;
  public uploadingProgress: number;
  public uploadingClipPath: SafeStyle;

  constructor(private photoViewer: PhotoViewer, private sanitization: DomSanitizer) { }

  ngOnInit() {
  }

  public uploadProgress($event: MulterFile) {
    console.log($event);
    if (!$event) {
      return;
    }

    const regexp = /data:(.*);base64,(.*)/;
    if (regexp.test($event.src) && (!$event.src.startsWith('data:'))) {
      let group = $event.src.match(regexp);
      let mimeType = group[1];
      if (!mimeType.startsWith('image')) {
        return;
      }
    }

    this.uploading = true;
    this.uploadingImage = this.sanitization.bypassSecurityTrustUrl($event.src);
    this.uploadingProgress = $event.progress;
    this.uploadingClipPath = this.sanitization.bypassSecurityTrustStyle(`circle(${this.uploadingProgress}%)`);
  }

  public uploadComplete($event) {
    console.log($event);
    this.uploading = false;
    this.images.push($event);
    this.imagesChange && this.imagesChange.emit(this.images);
  }

  public uploadError($event) {
    console.error($event);
    this.uploading = false;
  }

  public showImage(url: string) {
    this.photoViewer.show(url);
  }

}
