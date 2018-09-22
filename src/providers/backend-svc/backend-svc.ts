import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BackendSvcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface MetaData {
  firstName: string;
  lastName: string;
  nationality: string;
  passportNumber: string;
  birth: string;
  issueDate: string;
  expirationDate: string;
  issuer: string;
};

@Injectable()
export class BackendSvcProvider {
  private readonly url = 'https://tunnel3.cmlteam.com/';

  constructor(public http: HttpClient) {
    console.log('Hello BackendSvcProvider Provider');
  }

  uploadImageAndMetadata(fullImage: Blob, faceImage: Blob, metaData: MetaData) {
    const fullUrl = this.url + 'passport';

    const data = {
      passport: fullImage,
      photo: faceImage,
      ...metaData
    }
    return this.http.post(fullUrl, data, {});
  }

  getPhotoInfo(location: string) {
    const fullUrl = this.url + location;
    return this.http.get(fullUrl);
  }

  deleteDoc(location: string) {
    const fullUrl = this.url + location;
    return this.http.delete(fullUrl);
  }

  sharePartialData(documentHash: string, partialMetadata: Partial<MetaData>) {
    let fullUrl = this.url + 'share/' + documentHash;
    return this.http.post(fullUrl, partialMetadata);
  }

  // /verify/8c45c8a4f4050d49d082b47150bec5d3c693478ade637abd954d15de20b09de0
  getVerifyURL(partialDataHash: string) {
    return this.url + partialDataHash;
  }
}
