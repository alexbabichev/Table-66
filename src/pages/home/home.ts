import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DocsProvider } from '../../providers/docs/docs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public docs: DocsProvider
  ) { }

  onNavigate(page: string) {
    this.navCtrl.push(page);
  }
}
