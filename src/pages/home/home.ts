import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EosProvider } from '../../providers/eos/eos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, private eos: EosProvider) {
    // this.initCamera({ audio: false })
  }

  onNavigate(page: string) {
    this.navCtrl.push(page);
  }

  initCamera(config: any) {
    let video: any;
    setTimeout(() => {
      video = document.getElementById('video');
    })
    
    console.log(video);


    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          console.log(stream);
          video.srcObject = stream;
          console.log(video);
          // video.srcObject = stream; //window.URL.createObjectURL(stream);
          // video.play();
        }).catch(console.log);
    }

  }

}
