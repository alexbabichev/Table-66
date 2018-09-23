import { Injectable } from '@angular/core';

import Eos from 'eosjs';

import { HashObj } from './model';
import { userData, config } from './config';

@Injectable()
export class EosProvider {

  private eos: any;
  private contractName = 'epsilon';
  private contract: any;

  private options = { authorization: [ userData[0].username + `@active` ] };

  public hashes: Array<HashObj>;
  public pending: Array<HashObj>;

  constructor() { }

  async connect() {
    try {
      this.eos = Eos(config);
      this.initContract();
    } catch (error) {
      console.log(error);
    }
  }

  async initContract() {
    try {
      this.contract = await this.eos.contract(this.contractName);

      const balance = await this.getBalance(userData[0].username);
      console.log('Currency Balance', balance)

      this.getTables();
      console.log(this.hashes, this.pending);
      console.log(userData[2].username);
      // this.adduser(userData[2].username);
    } catch (error) {
      console.log(error);
    }
  }

  // get balance

  getBalance(username) {
    return this.eos.getAccount(username)
      .then(r => r.core_liquid_balance);
  }

  async getTables() {
    this.hashes = await this.getTable('hashdata');
    this.pending  = await this.getTable('pendinghash');
    const users  = await this.getTable('users');
    console.log(this.hashes, this.pending, users);
  }

  //

  getTable(tableName) {
    const opts = {
      json: true,
      scope: this.contractName,
      code: this.contractName,
      table: tableName,
      limit: 1000
    }
    return this.eos.getTableRows(opts)
      .then(r => r.rows);
  }

  // contract methods
  // actions adduser и removeuser must be called from owner acc, 
  // add from any acc, approve can be called only by appoved person by adduser method

  add(hash = '') {
    return this.contract.add(hash, this.options);
  }

  adduser(user: string) {
    const verifier = userData[2].username;
    const options = { authorization: [ verifier + `@active` ], sign: true };
    return this.contract.adduser(user, options);
  }

  // TODO: approve(verifier: string, hash: string)
  approve(hash: string) {
    const verifier = userData[2].username;
    const options = { authorization: [ verifier + `@active` ], sign: true };
    return this.contract.approve(verifier, hash, options);
  }

  removeuser(user: string) {
    return this.contract.removeuser(user);
  }

}
