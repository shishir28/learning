import { Component, OnInit } from '@angular/core';
import { TokenTradingService } from './shared/services/token-trading.service';

@Component({
  selector: 'app-token-trading',
  templateUrl: './token-trading.component.html',
  styleUrls: ['./token-trading.component.css']
})
export class TokenTradingComponent implements OnInit {
    public buyTokenName:string;
    public buyTokenAmount:number;
    public buyPrice:number;
    
    public sellTokenName:string;
    public sellTokenAmount:number;
    public sellPrice:number;

    constructor(private tokenTradingService: TokenTradingService) { }

    ngOnInit() {
      // Refresh balance for exchange 
      // update order book
      //listen to trading events 
    }

    buyToken() {
      this.tokenTradingService.buyToken(sessionStorage.getItem('currentAccount'), 
                                        this.buyTokenName,
                                        this.buyPrice,
                                        this.buyTokenAmount);
                                        // need to refresh Balance for Exchange and update order book
    }

    sellToken() {
      this.tokenTradingService.buyToken(sessionStorage.getItem('currentAccount'), 
                                        this.sellTokenName,
                                        this.sellPrice,
                                        this.sellTokenAmount);
                                        // need to refresh Balance for Exchange and update order book
    }
}
