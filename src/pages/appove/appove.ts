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

  async onClick(doc) {
    if (doc.loading)
      return;
    doc.loading = true;
    try {
      await this.docs.eos.approve(doc.hash);
      doc.loading = false;
      doc.proof = true;
    } catch (error) {
      doc.loading = false;
      console.log(error);
    }
  }
}
