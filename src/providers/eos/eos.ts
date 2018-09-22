import { Injectable } from '@angular/core';

import Eos from 'eosjs';

import { HashObj } from './model';
import { userData, config } from './config';

@Injectable()
export class EosProvider {

  private eos: any;
  private contractName = 'epsilon';
  private contract: any;

  public hashes: Array<HashObj>;

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      this.eos = Eos(config);
      this.test();
    } catch (error) {
      console.log(error);
    }
  }

  async test() {
    try {
      this.contract = await this.eos.contract(this.contractName);

      const balance = await this.getBalance(userData[0].username);
      console.log('Currency Balance', balance)

      this.hashes = await this.getTable('hashdata');
      console.log(this.hashes);

    } catch (error) {
      console.log(error);
    }

  }

  // get balance

  getBalance(username) {
    return this.eos.getAccount(username)
      .then(r => r.core_liquid_balance);
  }

  //

  getTable(tableName) {
    return this.eos.getTableRows(true, this.contractName, this.contractName, tableName)
      .then(r => r.rows);
  }

  // contract methods
  // action’ы adduser и removeuser требуют отправки из кошеля epsilon, 
  // add из любого акка, approve только от добавленного акка, который добавлен с помощью функции adduser

  add(hash = '') {
    return this.contract.add(hash);
  }

  adduser(user: string) {
    return this.contract.adduser(user);
  }

  approve(sender: string, hash: string) {
    return this.contract.approve(sender, hash);
  }

  removeuser(user: string) {
    return this.contract.removeuser(user);
  }

}
