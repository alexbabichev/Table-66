import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropIdPage } from './crop-id';
import {ImageCropperComponent} from 'ng2-img-cropper';

@NgModule({
  declarations: [
    CropIdPage,
    ImageCropperComponent
  ],
  imports: [
    IonicPageModule.forChild(CropIdPage),
  ],
})
export class CropIdPageModule {}
