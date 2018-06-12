

 import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TranslateService } from '@ngx-translate/core';
import { AppTranslationModule } from './app.translation.module';

import { RoutingModule } from "./app-routing.module";

import { httpFactory } from './shared/httpFactory';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { NotFoundComponent } from "./shared/not-found.component";
import { AccessDeniedComponent } from "./shared/access-denied.component";
import { InternalServerErrorComponent } from './shared/internal-server-error.component';
import { CustomOption } from './main/customOption.conmponent';
import { ToastOptions } from 'ng2-toastr/src/toast-options';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    InternalServerErrorComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppTranslationModule,
    MainModule,
    HttpModule
  ],
  providers: [{provide: ToastOptions, useClass: CustomOption},{
    provide: Http,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions],
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(applicationRef: ApplicationRef) {
    //for ng2-bootstrap-modal in angualar 5
    Object.defineProperty(applicationRef, '_rootComponents', {get: () => applicationRef['components']});
  }

 }
