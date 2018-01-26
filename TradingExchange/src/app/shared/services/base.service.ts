import { Injectable } from '@angular/core';
import * as Web3  from 'web3';
import * as contract  from 'truffle-contract';

import * as exchangeArtifacts  from '../../../../build/contracts/Exchange.json';
import * as tokenArtifacts  from '../../../../build/contracts/MonadToken.json';



export class BaseService {
  protected exchangeContract = contract(exchangeArtifacts);
  protected tokenContract = contract(tokenArtifacts);
  
  protected web3Provider:any;
  protected web3:any;

  constructor() {
     this.initializeWeb3();
     this.initializeContracts();
   }

  initializeWeb3() {
      if (typeof this.web3 !== 'undefined') {
          this.web3Provider = Web3.currentProvider;
          this.web3 = new Web3(Web3.currentProvider);
      } else {
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        this.web3 =new Web3(this.web3Provider);
      }
  }

  initializeContracts(){
    this.exchangeContract.setProvider( this.web3Provider);
    this.tokenContract.setProvider(this.web3Provider);
  }
 
}
