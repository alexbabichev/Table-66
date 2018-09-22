import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GenerateProofPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-proof',
  templateUrl: 'generate-proof.html',
})
export class GenerateProofPage {
  public myData = {
    identityId: false,
    fullName: false,
    dateOfBirth: false,
    address: false,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateProofPage');
  }

}
