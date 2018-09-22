import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropIdPage } from './crop-id';

@NgModule({
  declarations: [
    CropIdPage,
  ],
  imports: [
    IonicPageModule.forChild(CropIdPage),
  ],
})
export class CropIdPageModule {}
