import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import image from './image';
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
    identityId: '123456',
    dateOfBirth: '01/01/1900'
  };
  public sharedDataKeys = [];

  private _placeHolderSafe: SafeUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer) {

  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad VerificatorPage');
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
