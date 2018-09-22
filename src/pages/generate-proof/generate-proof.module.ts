import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateProofPage } from './generate-proof';

import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    GenerateProofPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(GenerateProofPage),
  ],
})
export class GenerateProofPageModule {}
