import { Injectable } from '@angular/core';

import { Doc } from './model';
import { EosProvider } from '../../providers/eos/eos';
import { sha256 } from 'js-sha256';

@Injectable()
export class DocsProvider {

  public list: Array<Doc> = [];

  public pending;

  constructor(public eos: EosProvider) {
    this.eos.connect();
    this.loadDocs();
  }

  loadDocs() {
    this.eos.getTables();
    const docs = localStorage.getItem('eosDocs');
    if (!docs)
      return;
    this.list = JSON.parse(docs);

    setTimeout(() => {
      this.list.forEach(doc => {
        doc.proof = !!this.find(doc.hash);
      });
    }, 1000)
  }

  saveDocs() {
    localStorage.setItem('eosDocs', JSON.stringify(this.list));
  }

  async add() {
    const data: Doc = {
      title: 'new doc2',
      date: Date.now(),
      proof: false
    };

    this.list.push(data);
    const hash = sha256(JSON.stringify(data));

    console.log(hash);

    data.hash = hash;

    try {
      // const approve = await this.eos.approve(hash);
      const tx = await this.eos.add(hash);
      console.log(tx);
      this.eos.getTables();
      this.saveDocs();
    } catch (error) {
      console.log(error);
    }


  }

  approve(hash) {
    // return this.eos.approve(hash);
  }

  find(hash: string) {
    return this.eos.hashes.find(v => v.hash === hash);
  }





}
