import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { ManageTokenComponent } from './manage-token.component';
import { TokenTradingComponent } from './token-trading.component';
import { OverviewComponent } from './overview.component';
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
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
