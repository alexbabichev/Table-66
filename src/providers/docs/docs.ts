import { Injectable } from '@angular/core';

import { Doc } from './model';
import { EosProvider } from '../../providers/eos/eos';

@Injectable()
export class DocsProvider {

  public list: Array<Doc> = [{
    title: 'National ID',
    date: '01/01/1900',
    proof: true
  }, {
    title: 'Driver License',
    date: '01/01/1900',
    proof: false
  }];

  constructor(private eos: EosProvider) {
    this.eos.connect();
  }

  add() {
    this.list.push({
      title: 'new doc',
      date: '01/01/1900',
      proof: false
    })
  }

}
