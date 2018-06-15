import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { emailConfig } from './emails/email.module';

import { HomeComponent } from './home/home.component';
import { EmailDashboardComponent } from './emails/emailDashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ...emailConfig.imports,

    ],

    declarations: [
        HomeComponent,
        EmailDashboardComponent,
        ...emailConfig.declarations,
        

    ],
    entryComponents: [
    ],
    exports: [
        ...emailConfig.exports,
    ],
    providers: [
        ...emailConfig.providers
    ]
})
export class MainModule { }
