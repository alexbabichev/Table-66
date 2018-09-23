import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import image from './image';
import {metadataDisplayNames} from '../../providers/backend-svc/backend-svc';
// import { Doc } from '../../providers/docs/model';

/**
 * Generated class for the VerificatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verificator',
  templateUrl: 'verificator.html',
})
export class VerificatorPage {

  public sharedData = {
    passportNumber: '1234567890',
    birth: '01/01/1990'
  };
  public sharedDataKeys = [];

  private _placeHolderSafe: SafeUrl;
  public metadataDisplayNames = metadataDisplayNames;
  // public doc: Doc;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer) {

  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad VerificatorPage');
    // this.doc = this.navParams.data;
  }

  public objectKeys(items) {
    return Object.keys(items);
  }

  public ngOnInit() {
    this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(image);
  }

  public get placeholder() {
    return this._placeHolderSafe;
  }
}
