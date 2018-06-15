import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PalindromeService } from './shared/services/palindromeService';
import { NewPalindromeComponent } from './new-Palindrome.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

export const palindromeConfig: NgModule = {
    imports: [
        CommonModule,
    ],
    declarations: [
        NewPalindromeComponent
    ],
    entryComponents: [
        
    ],
    exports: [
        
    ],
    providers: [
        PalindromeService
    ]
}