//our root app component
import { Component, ViewChild } from '@angular/core'
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
// import { BackendSvcProvider, MetaData } from '../../providers/backend-svc/backend-svc';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-crop-id',
  templateUrl: 'crop-id.html',
})

export class CropIdPage {
  public name: string;
  public croppedImage: any;
  public cropperSettings1: CropperSettings;
  public croppedWidth: number;
  public croppedHeight: number;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

    this.croppedImage = {};

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
    const croppedPhoto = this.croppedImage.image;
    const fullPhoto = this.croppedImage.original;
    let myMetaData = {
      croppedPhoto,
      fullPhoto
    };

    return this.onNavigate('UploadIdPage', myMetaData);
  }

  onNavigate(page: string, params) {
    this.navCtrl.push(page, params);
  }
}
