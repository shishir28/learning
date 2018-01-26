import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as contract from 'truffle-contract';

import * as exchangeArtifacts from '../../../../build/contracts/Exchange.json';

import { BaseService } from './base.service';

@Injectable()

export class AccountService extends BaseService {
 public account:any

  constructor() {
    super();
  }

  InitializeAccount() {
    let chainInstance = null;
    this.tokenContract.deployed().then(instance => {
      chainInstance = instance;
      this.web3.eth.getCoinbase(function(err, account) {
        if (err === null) {
           sessionStorage.setItem('defaultAddress',account);
        }
      });
      this.web3.eth.getAccounts(function (err,accounts){
        if(err===null) {
          sessionStorage.setItem('allAccounts',accounts);
          sessionStorage.setItem('currentAccount',accounts[0]);
        }
      });
    });
  }
}
