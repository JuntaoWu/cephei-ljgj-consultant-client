
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapDialogPage } from '../../pages/pages';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Platform } from '@ionic/angular';
// import { BaiduGeolocation } from '@orz-ionic-lab/baidu-geolocation';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/providers';
import { NgZone } from '@angular/core';
// import { BaiduGeolocationIOS } from '@orz-ionic-lab/baidu-geolocation-ios';

declare var BMap;
declare var baidu_location;

@Component({
    selector: 'geolocation-bar',
    templateUrl: './geolocation-bar.component.html'
})
export class GeolocationBarComponent implements OnInit, OnDestroy {

    @Input("readonly") readonly: boolean = false;

    @Input("currentlng") currentlng: number = 0;
    @Output("currentlngChange") currentlngChange: EventEmitter<number> = new EventEmitter<number>();

    @Input("currentlat") currentlat: number = 0;
    @Output("currentlatChange") currentlatChange: EventEmitter<number> = new EventEmitter<number>();

    @Input("address") address: string = "";
    @Output("addressChange") addressChange: EventEmitter<string> = new EventEmitter<string>();

    private geolocation: any;

    private subscription: Subscription;

    private baiduGeolocation: any; private baiduGeolocationIOS: any;

    constructor(private modalCtrl: ModalController, private platform: Platform, private toastService: ToastService, private ngZone: NgZone) {
        if (platform.is("android") && platform.is("cordova")) {
            this.geolocation = this.baiduGeolocation;// || new BMap.Geolocation();
        }
        else {
            this.geolocation = this.baiduGeolocationIOS;
        }
    }

    async ngOnInit() {
        if (this.readonly) {
            return;
        }

        await this.platform.ready();

        this.locateMe();
    }

    locateMe() {
        const option = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 5 * 60 * 1000
        };

        this.geolocation.getCurrentPosition(option).then((position) => {
            this.refreshPosition(position);
        }).catch(reason => {

            if (reason && reason.code && reason.code == reason.TIMEOUT) {
                this.toastService.show("获取定位超时，请确保网络信号良好");
            }
            else if (reason && reason.code && reason.code == reason.PERMISSION_DENIED) {
                this.toastService.show("获取定位失败，请确保未屏蔽定位功能");
            }
            else if (reason && reason.code && reason.code == reason.POSITION_UNAVAILABLE) {
                this.toastService.show("获取定位失败，位置暂不可用");
            }
            else {
                this.toastService.show(reason && reason.message || reason);
            }

            this.address = "Failed to locate your device.";
            this.addressChange.emit(this.address);

            this.subscription = this.geolocation.watchPosition(option).subscribe(
                (position: any) => {
                    this.refreshPosition(position);
                    this.subscription && this.subscription.unsubscribe();
                });
        });
    }

    ngOnDestroy(): void {
        this.subscription && this.subscription.unsubscribe();
    }

    refreshPosition(position) {
        if (position && position.locType) {
            position = {
                coords: {
                    longitude: position.longitude,
                    latitude: position.latitude
                }
            };
        }

        if (!position || !position.coords) {
            if (position && position.code && position.code == position.TIMEOUT) {
                this.toastService.show("获取定位超时，请确保网络信号良好");
            }
            else if (position && position.code && position.code == position.PERMISSION_DENIED) {
                this.toastService.show("获取定位失败，请确保未屏蔽定位功能");
            }
            else if (position && position.code && position.code == position.POSITION_UNAVAILABLE) {
                this.toastService.show("获取定位失败，位置暂不可用");
            }
            else {
                this.toastService.show(position && position.message || position);
            }
            this.address = "Failed to locate your device.";
            this.addressChange.emit(this.address);
            return;
        }

        //alert(`lng:${position.coords.longitude}, lat:${position.coords.latitude}`);
        let point = new BMap.Point(position.coords.longitude, position.coords.latitude);
        this.currentlat = parseFloat(position.coords.latitude);
        this.currentlatChange.emit(this.currentlat);
        this.currentlng = parseFloat(position.coords.longitude);
        this.currentlngChange.emit(this.currentlng);
        this.setLocation(point);
    }

    async openMapDialog() {
        let mapModal = await this.modalCtrl.create({
            component: MapDialogPage,
            componentProps: {
                currentlat: this.currentlat, currentlng: this.currentlng, address: this.address
            }
        });
        mapModal.present();
    }

    public setLocation(point) {
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, rs => {
            let addComp = rs.addressComponents;
            //alert(JSON.stringify(addComp));
            let result = `${addComp.province} ${addComp.city} ${addComp.district} ${addComp.street} ${addComp.streetNumber}`;

            this.ngZone.run(() => {
                this.address = result;
                this.addressChange.emit(this.address);
            });
        });
    }
}