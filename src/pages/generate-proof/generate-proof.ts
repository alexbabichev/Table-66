import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  public idImage = 'resources/sample-id-card.jpg';
  public isSubmitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateProofPage');
  }

  generateQRCode() {
    this.isSubmitted = true;
  }

}
