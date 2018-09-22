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

  private _placeHolderSafe: SafeUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificatorPage');
  }

  public ngOnInit() {
    this._placeHolderSafe = this.sanitizer.bypassSecurityTrustUrl(image);
  }

  public get placeholder() {
    return this._placeHolderSafe;
  }
}
