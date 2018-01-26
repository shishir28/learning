import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as exchangeArtifacts from '../../../../build/contracts/Exchange.json';
import { BaseService } from './base.service';

@Injectable()
export class TokenTradingService extends BaseService {

  constructor() {
    super();
  }

  buyToken(currentAccount: string, symbolName: string, priceInWei: number, amount: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.buyToken(symbolName, priceInWei, amount, {
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      alert('Token Bought!')
      console.log(data);
    });
  }
  //sellToken(string _symbolName, uint _priceInWei, uint _amount)

  sellToken(currentAccount: string, symbolName: string, priceInWei: number, amount: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.sellToken(symbolName, priceInWei, amount, {
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      // order book needs to be updated
      alert('Token Sold!')
      console.log(data);
    });
  }

}
