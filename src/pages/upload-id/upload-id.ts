import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MetaData, metadataDisplayNames} from '../../providers/backend-svc/backend-svc';
import { DocsProvider } from '../../providers/docs/docs';
import { Doc } from '../../providers/docs/model';

@IonicPage()
@Component({
  selector: 'page-upload-id',
  templateUrl: 'upload-id.html',
})
export class UploadIdPage {

  public metadata: MetaData;
  public metadataDisplayNames: MetaData;

  private croppedPhoto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public docs: DocsProvider) {
    this.metadataDisplayNames = metadataDisplayNames;
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

  getKeys(items) {
    return Object.keys(items);
  }

  submitNewDocument() {
    const data: Doc = {
      title: 'Government ID',
      date: new Date(this.metadata.birth) as any,
      proof: false
    };
    this.docs.addDocument(data)
      .then(() => {
        this.navigateHome();
      });

  }

  navigateHome() {
    this.navCtrl.pop();
    this.navCtrl.pop();
  }

}
