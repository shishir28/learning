import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import * as contract from 'truffle-contract';
import * as exchangeArtifacts from '../../../../build/contracts/Exchange.json';
import { BaseService } from './base.service';

@Injectable()
export class TokenManagementService extends BaseService {

  constructor() {
    super();
  }

  addToken(symbolName: string, tokenAddress: string) {
    let chainInstance = null;
    this.exchangeContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.addToken(symbolName, tokenAddress, {
        from: this.web3.eth.accounts[1], gas: 3000000
      });
    }).then(function (data) {
      alert('Token Added!')
      console.log(data);
    });
  }

  allowanceToken(tokenAmount: number, toAddress: string) {
    let chainInstance = null;
    this.tokenContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.approve(toAddress, tokenAmount, {
        from: this.web3.eth.accounts[1], gas: 3000000
      });
    }).then(function (data) {
      alert('Token Approved!')
      console.log(data);
      return this. updateTokenBalance();
      
    });
  }

  sendToken(tokenAmount: number, toAddress: string) {
    let chainInstance = null;
    this.tokenContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.transfer(toAddress, tokenAmount, {
        from: this.web3.eth.accounts[1], gas: 3000000
      });
    }).then(function (data) {
      alert('Token Sent!')
      console.log(data);
      return this. updateTokenBalance();
    });
  }

  updateTokenBalance(){
    let chainInstance = null;
    this.tokenContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.balanceOf.call(sessionStorage.getItem('currentAccount'));
    }).then(function (data) {
      console.log(data);
      return data;
    });
  }
}
