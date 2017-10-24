import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";

@Component({
  selector: 'page-native-demo',
  templateUrl: 'native-demo.html',
})
export class NativeDemoPage {
  networkType = 'unknown';
  currentVersionNo: string = '1.0.0';
  scanText = '';
  location;
  imgPath;

  constructor(public navCtrl: NavController, public nativeService: NativeService) {
  }

  ionViewWillEnter() {
    if(!this.nativeService.isMobile()){
      this.nativeService.alert('请使用真机调试');
    }
  }
  getNetworkType() {
    this.networkType = this.nativeService.getNetworkType()
  }

  getVersionNumber() {
    if (this.nativeService.isMobile()) {
      this.nativeService.getVersionNumber().subscribe(res => {
        this.currentVersionNo = res;
      })
    }
  }

  callNumber(number) {
    this.nativeService.isMobile() && this.nativeService.callNumber(number);
  }

  scan() {
    if (this.nativeService.isMobile()) {
      this.nativeService.scan().subscribe(res => {
        this.scanText = res;
      });
    }
  }

  getUserLocation() {
    this.nativeService.getUserLocation().subscribe(res => {
      this.location = res;
    });
  }

  getPictureByCamera() {
    if (this.nativeService.isMobile()) {
      this.nativeService.getPictureByCamera({
        destinationType: 1//期望返回的图片格式,1图片路径
      }).subscribe(img => {
        this.imgPath = img;
      });
    }
  }

}