// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import ScatterJS from 'scatter-js/dist/scatter.esm';

const network = {
  blockchain:'eos',
  protocol:'http',
  host:'dev.cryptolions.io',
  port:38888,
  chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}

@Injectable()
export class EosProvider {

  constructor() {
    console.log('Hello EosProvider Provider');
    this.connect();
  }

  async connect() {
    try {
      const connected = await ScatterJS.scatter.connect("Put_Your_App_Name_Here");
      const scatter = ScatterJS.scatter;
      const requiredFields = { accounts:[network] };
      const identity = await scatter.getIdentity(requiredFields);

      const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
      const eosOptions = { expireInSeconds: 60 };

      console.log(account, eosOptions);

    } catch (error) {
      console.log(error);
    }
  }

}
