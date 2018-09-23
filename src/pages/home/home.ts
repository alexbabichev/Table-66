import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DocsProvider } from '../../providers/docs/docs';
import { Doc } from '../../providers/docs/model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public docs: DocsProvider
  ) { }

  ionViewDidEnter() {
      this.docs.loadDocs();
      console.log(1);
  }

  onNavigate(page: string, params?: any) {
    this.navCtrl.push(page);
  }

  test() {
    this.docs.add();
  }

  public verifyDocument(doc: Doc) {
    return this.onNavigate('GenerateProofPage', doc);
  }
}
