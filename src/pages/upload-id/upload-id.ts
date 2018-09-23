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

  private fullImage: any;
  private croppedImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public docs: DocsProvider) {
    this.metadataDisplayNames = metadataDisplayNames;
  }

  ionViewDidLoad() {
    this.croppedImage = this.navParams.data.croppedPhoto;
    this.fullImage = this.navParams.data.fullPhoto;
    this.metadata = {
      firstName: 'John',
      lastName: 'Doe',
      birth: '01/01/1990',
      expirationDate: '01/01/2020',
      issueDate: '01/01/2010',
      issuer: 'EOS',
      nationality: 'Hackville',
      passportNumber: '1234567890'
    };
  }

  getKeys(items) {
    return Object.keys(items);
  }

  submitNewDocument() {
    const data: Doc = {
      title: 'Government ID',
      date: Date.now(),
      proof: false,
      fullImage: this.fullImage,
      croppedImage: this.croppedImage
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
