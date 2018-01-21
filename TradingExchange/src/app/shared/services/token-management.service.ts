import { Injectable } from '@angular/core';
import * as Web3  from 'web3';
import * as contract  from 'truffle-contract';

import * as tokenManagementArtifacts  from '../../../../build/contracts/TokenManagement.json';

declare var window :any;
@Injectable()
export class TokenManagementService {
  tokenManagementContract = contract(tokenManagementArtifacts);
  web3Provider:any;
  web3:any;

  constructor() {
     this.initializeWeb3();
     this.initializeContract();
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

  initializeContract(){
    this.tokenManagementContract.setProvider( this.web3Provider);
  }

  addToken( symbolName:string,  tokenAddress:string){
    let chainInstance = null;
    this.tokenManagementContract.deployed().then(instance => {
      chainInstance = instance;
      return chainInstance.addToken(symbolName,tokenAddress,{
        from: this.web3.eth.accounts[1],gas:3000000
     });
    })
    .then(function (data) {
     return  chainInstance.getSymbolIndex(symbolName  ,{
      from: this.web3.eth.accounts[1],gas:3000000
   }     )
    }).then(function (data) {
      console.log(data);
    });
  }
}
