import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';

import {AccountService} from './shared/services/account.service';

import {TokenManagementService} from './shared/services/token-management.service';
import {TokenTradingService}  from './shared/services/token-trading.service';
import {OverviewService}  from './shared/services/overview.service';

import {AppComponent} from './app.component';
import {ManageTokenComponent} from './manage-token.component';
import {TokenTradingComponent} from './token-trading.component';
import {OverviewComponent} from './overview.component';
import {routes} from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ManageTokenComponent,
    TokenTradingComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ AccountService, TokenManagementService,TokenTradingService,OverviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
