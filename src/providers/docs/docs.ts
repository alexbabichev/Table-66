import { Injectable } from '@angular/core';

import { Doc } from './model';
import { EosProvider } from '../../providers/eos/eos';
import { sha256 } from 'js-sha256';

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
    const data = {
      title: 'new doc',
      date: '01/01/1900',
      proof: false
    };

    this.list.push(data);
    const hash = sha256('test'); // SHA256(JSON.stringify(data))

    console.log(hash, hash.toString());
    this.eos.add(hash.toString()).catch(console.log);
  }

  find(hash: string) {
    return this.eos.hashes.find(v => v.hash === hash);
  }





}
