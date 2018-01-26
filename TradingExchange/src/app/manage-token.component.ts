import { Component, OnInit } from '@angular/core';

import { TokenManagementService } from './shared/services/token-management.service';
@Component({
  selector: 'app-manage-token',
  templateUrl: './manage-token.component.html',
  // styleUrls: ['./manage-token.component.css']
})
export class ManageTokenComponent implements OnInit {
    public tokenName: string;
    public tokenAddress: string;
    public sendTokenAmount: number;
    public sendTokenAddress: string;
    public approveTokenAmount: number;
    public approveTokenAddress: string;

    constructor(private tokenManagementService: TokenManagementService) { }

    ngOnInit() {
      this.tokenManagementService.updateTokenBalance();
    }

    addTokenToExchange() {
      this.tokenManagementService.addToken(this.tokenName, this.tokenAddress);
    }

    approveToken() {
      this.tokenManagementService.allowanceToken(this.approveTokenAmount, this.approveTokenAddress);
    }

    sendToken(sendTokenAmount, sendTokenAddress) {
      this.tokenManagementService.sendToken(this.sendTokenAmount, this.sendTokenAddress);
    }
}
