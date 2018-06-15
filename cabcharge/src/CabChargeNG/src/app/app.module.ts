import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MainModule } from './main/main.module';
import { RoutingModule } from "./app-routing.module";
import { httpFactory } from './shared/httpFactory';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MainModule,
    HttpModule,


  ],
  providers: [ {
    provide: Http,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions],
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
