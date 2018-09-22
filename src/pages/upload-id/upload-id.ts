import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadIdPage');
  }

  onNavigate(page: string) {
    this.navCtrl.push(page);
  }

}
