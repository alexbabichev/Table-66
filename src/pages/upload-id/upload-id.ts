import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the UploadIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-id',
  templateUrl: 'upload-id.html',
})
export class UploadIdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        console.log(status);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadIdPage');
  }

  onNavigate(page: string) {
    this.navCtrl.push(page);
  }

}
