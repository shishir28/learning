import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app/app.translation.module';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DataTablesModule } from 'angular-datatables';


import { palindromeConfig } from './palindrome/palindrome.module';
import { HomeComponent } from './home/home.component';
import { PalindromeDashboardComponent } from './palindrome/palindromeDashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppTranslationModule,
        BootstrapModalModule,
        DataTablesModule,
        ...palindromeConfig.imports,
    ],

    declarations: [
        HomeComponent,
        PalindromeDashboardComponent,
        ...palindromeConfig.declarations,

    ],
    entryComponents: [
    ],
    exports: [
        ...palindromeConfig.exports,
    ],
    providers: [
        ...palindromeConfig.providers
    ]
})
export class MainModule { }
