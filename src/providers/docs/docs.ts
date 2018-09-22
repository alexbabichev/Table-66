import { Injectable } from '@angular/core';

import { Doc } from './model';

@Injectable()
export class DocsProvider {

  public list: Array<Doc> = [{
    title: 'National ID',
    date: '01/01/1900',
    proof: true
  },{
    title: 'Driver License',
    date: '01/01/1900',
    proof: false
  }];

  constructor() {
    console.log('Hello DocsProvider Provider');
  }

}
