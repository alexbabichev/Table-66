import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MetaData, metadataDisplayNames} from '../../providers/backend-svc/backend-svc';
import { Doc } from '../../providers/docs/model';


@IonicPage()
@Component({
  selector: 'page-generate-proof',
  templateUrl: 'generate-proof.html',
})
export class GenerateProofPage {

  public qrdata: string;

  public isSubmitted = false;

  public metadata: any;
  public metadataDisplayNames: MetaData;
  public doc: Doc;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.metadataDisplayNames = metadataDisplayNames;
    this.metadata = {
      firstName: false,
      lastName: false,
      birth: false,
      expirationDate: false,
      issueDate: false,
      issuer: false,
      nationality: false,
      passportNumber: false
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateProofPage');
    this.doc = this.navParams.data;
    this.qrdata = location.protocol + '//' + location.host + '/#/verificator';
  }

  getKeys(items) {
    return Object.keys(items);
  }

  generateQRCode() {
    this.isSubmitted = true;
  }

}
