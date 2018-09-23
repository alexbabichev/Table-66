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
  public metadataDisplayNames: MetaData;

  private croppedPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.metadataDisplayNames = {
      firstName: 'First Name',
      lastName: 'Last Name',
      birth: 'Birth Date',
      expirationDate: 'Expiration date',
      issueDate: 'Issue date',
      issuer: 'Issuer',
      nationality: '',
      passportNumber: ''
    };
  }

  ionViewDidLoad() {
    this.croppedPhoto = this.navParams.data.croppedPhoto;
    this.metadata = {
      firstName: '',
      lastName: '',
      birth: '',
      expirationDate: '',
      issueDate: '',
      issuer: '',
      nationality: '',
      passportNumber: ''
    };
  }

  onNavigate(page: string) {
    this.navCtrl.pop();
    this.navCtrl.pop();
  }

}
