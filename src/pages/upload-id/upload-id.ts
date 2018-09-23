import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {MetaData} from '../../providers/backend-svc/backend-svc';

@IonicPage()
@Component({
  selector: 'page-upload-id',
  templateUrl: 'upload-id.html',
})
export class UploadIdPage {

  public uploadData = {
    identityId: '',
    fullName: '',
    dateOfBirth: '',
    address: '',
  };

  public metadata: MetaData;

  private croppedPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.croppedPhoto = this.navParams.data.croppedPhoto;
    this.metadata = {
      firstName: '',
    }
  }

  onNavigate(page: string) {
    this.navCtrl.pop();
    this.navCtrl.pop();
  }

}
