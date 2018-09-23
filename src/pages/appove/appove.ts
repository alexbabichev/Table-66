import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { DocsProvider } from '../../providers/docs/docs';


@IonicPage()
@Component({
  selector: 'page-appove',
  templateUrl: 'appove.html',
})
export class AppovePage {

  constructor(
    public navCtrl: NavController,
    public docs: DocsProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppovePage');
  }

  async onClick(doc) {
    console.log(doc);
    try {
      await this.docs.eos.approve(doc.hash);
    } catch (error) {
      console.log(error);
    }
    
  }

}
