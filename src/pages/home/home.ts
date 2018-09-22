import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EosProvider } from '../../providers/eos/eos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private eos: EosProvider) {
    
  }

  onNavigate(page: string) {
    this.navCtrl.push(page);
  }

}
