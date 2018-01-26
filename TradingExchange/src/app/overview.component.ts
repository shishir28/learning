import { Component, OnInit } from '@angular/core';
import { OverviewService } from './shared/services/overview.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
  public depositTokenName:string;
  public depositTokenAmount:number;
  
  public withdrawTokenName:string;
  public withdrawTokenAmount:number;

  public depositEtherAmount:number;
  public withdrawEtherAmount:number;
  

  constructor(private overviewService: OverviewService) { }

  ngOnInit() {
    // Refresh balance for exchange 
    // update order book
    //listen to trading events 
  }
   

  depositEther() {
    this.overviewService.depositEther(sessionStorage.getItem('currentAccount'),  this.depositEtherAmount );
     // need to refresh Balance for Exchange and update order book
  }

  withdrawEther() {
    this.overviewService.withdrawEther(sessionStorage.getItem('currentAccount'),  this.withdrawEtherAmount );
     // need to refresh Balance for Exchange and update order book
  }

  depositToken() {
    this.overviewService.depositToken(sessionStorage.getItem('currentAccount'),
    this.depositTokenName, 
    this.depositTokenAmount );
     // need to refresh Balance for Exchange and update order book
  }

  withdrawToken() {
    this.overviewService.withdrawToken(sessionStorage.getItem('currentAccount'),
    this.withdrawTokenName, 
    this.withdrawTokenAmount );
     // need to refresh Balance for Exchange and update order book
  }
}
