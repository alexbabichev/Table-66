//our root app component
import { Component, ViewChild } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@IonicPage()
@Component({
  selector: 'page-crop-id',
  templateUrl: 'crop-id.html',
})

export class CropIdPage {
  name: string;
  data1: any;
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 150;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 150;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 10;
    this.cropperSettings1.minHeight = 10;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.keepAspect = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.data1 = {};
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  uploadCroppedPhoto() {

  }
}
