import { Component, OnInit, OnDestroy } from '@angular/core';
import { App, NavController, NavParams, ModalController, LoadingController } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { Platform } from '@ionic/angular';


@Component({
    selector: 'page-player-dialog',
    templateUrl: 'player-dialog.html'
})

export class PlayerDialogPage implements OnInit, OnDestroy {
    private processtimer: any;
    private filepath: any;
    private mediaObject: MediaObject;
    private duration: any;
    public isPlayAudio: boolean;
    public isPauseAudio: boolean;
    public isContiueAudio: boolean;
    constructor(params: NavParams,
        public modalCtrl: ModalController,
        private media: Media,
        private platform: Platform) {
        this.filepath = params.get('filepath');
    }
    ngOnInit() {
        this.isPlayAudio = false;
        this.isPauseAudio = true;
        this.isContiueAudio = true;
    }

    ngOnDestroy() {
        this.mediaObject && this.mediaObject.stop();
        this.mediaObject && this.mediaObject.release();
    }

    goBack() {
        this.modalCtrl.dismiss();
        clearInterval(this.processtimer);
    }

    get platformMediaURL() {
        return this.platform.is('ios') ? this.filepath.replace(/^file:\/\//, '') : this.filepath
    }

    playAudio() {
        this.isPlayAudio = true;
        this.isPauseAudio = false;
        this.isContiueAudio = false;
        let that = this;

        this.mediaObject = this.media.create(this.platformMediaURL);
        this.mediaObject.onSuccess.subscribe(() => {
            that.isPlayAudio = false;
            that.isPauseAudio = true;
            that.isContiueAudio = true;
            console.log('playMedia.onSuccess() -> Play Audio Success');
        });

        this.mediaObject.onError.subscribe((error) => {
            console.log('playMedia.onError() -> Play Audio error: ' + JSON.stringify(error));
        });

        this.mediaObject.play();

        this.processtimer = window.setInterval(function () {
            that.mediaObject.getCurrentPosition().then((position) => {
                that.duration = that.mediaObject.getDuration();
                console.log('current position: ' + position)
                if (position > 0) {
                    var prenctage = position / that.duration;
                    var jindutiao = document.getElementById('processor');
                    var controller = document.getElementById('controller');
                    jindutiao.style.width = prenctage * 100 + '%';
                    controller.style.left = prenctage * 100 + '%';
                } else {
                    clearInterval(that.processtimer);
                }
            })
        }, 1000);
    }

    PauseAudio() {
        this.mediaObject.pause();
    }

    ContinuePlay() {
        this.mediaObject.play();
    }

}