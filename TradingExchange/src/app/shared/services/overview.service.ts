import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as exchangeArtifacts from '../../../../build/contracts/Exchange.json';
import { BaseService } from './base.service';

@Injectable()
export class OverviewService extends BaseService {

  constructor() {
    super();
  }

  depositEther(currentAccount: string,  amountInWei: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.depositEther( {value: amountInWei } , {
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      alert('Ether Deposited!')
      console.log(data);
    });
  }

  withdrawEther(currentAccount: string,  amountInWei: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.withdrawEther( amountInWei, {
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      alert('Ether Wihdrawn!')
      console.log(data);
    });
  }

  depositToken(currentAccount: string, symbolName: string,  amount: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.depositToken(symbolName, amount,{
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      alert('Token Deposited!')
      console.log(data);
    });
  }


  withdrawToken(currentAccount: string, symbolName: string,  amount: number) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.withdrawToken(symbolName, amount,{
        from: currentAccount, gas: 3000000
      });
    }).then(function (data) {
      // refresh Balance for exchange
      alert('Token Wihdrawn!')
      console.log(data);
    });
  }

}
