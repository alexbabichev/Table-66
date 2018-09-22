import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateProofPage } from './generate-proof';

@NgModule({
  declarations: [
    GenerateProofPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateProofPage),
  ],
})
export class GenerateProofPageModule {}
