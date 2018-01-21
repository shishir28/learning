import { Component, OnInit } from '@angular/core';

import {TokenManagementService}  from './shared/services/token-management.service'
@Component({
  selector: 'app-manage-token',
  templateUrl: './manage-token.component.html',
  styleUrls: ['./manage-token.component.css']
})
export class ManageTokenComponent implements OnInit {

  public inputTokenName:string;
  public inputTokenAddress:string;
  
  constructor(private tokenManagementService: TokenManagementService) { }

  ngOnInit() {
  }

  addTokenToExchange(inputTokenName,inputTokenAddress){
   this.tokenManagementService.addToken(inputTokenName,inputTokenAddress);
  }
}
