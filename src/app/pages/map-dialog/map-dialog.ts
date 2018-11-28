import { Component, OnInit } from '@angular/core';
import { App, NavController,NavParams,ModalController  } from '@ionic/angular';

import { BaiduMapModule } from 'angular2-baidu-map';
import { ControlAnchor, MapOptions, NavigationControlOptions, NavigationControlType, Point } from 'angular2-baidu-map';


@Component({
    selector: 'page-map-dialog',
    templateUrl: 'map-dialog.html'
})

export class MapDialogPage implements OnInit{
    public options: MapOptions;
    public point: Point;
    public navOptions: NavigationControlOptions;
    private currentlat:any;
    private currentlng:any;
    private address:string;
    constructor(params: NavParams,public modalCtrl: ModalController){
        this.currentlat = params.get('currentlat');
        this.currentlng = params.get('currentlng');
        this.address = params.get('address');
    }
    ngOnInit(){
        this.options = {
            centerAndZoom: {
              lat: this.currentlat,
              lng: this.currentlng,
              zoom: 16
            },
            enableKeyboard: true
          };
      
          this.point = {
            lat: this.currentlat,
            lng: this.currentlng
          };
      
          this.navOptions = {
            anchor: ControlAnchor.BMAP_ANCHOR_TOP_RIGHT,
            type: NavigationControlType.BMAP_NAVIGATION_CONTROL_PAN
        };
    }

    goBack(){
        this.modalCtrl.dismiss();
    }

    showWindow({ e, marker, map }: any): void {
        map.openInfoWindow(
          new window.BMap.InfoWindow(this.address, {
            offset: new window.BMap.Size(0, -30),
            title: '[位置]'
          }),
          marker.getPosition()
        )
      }
}