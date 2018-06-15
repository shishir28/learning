import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailService } from './shared/services/emailService';
import { NewEmailComponent } from './new-Email.component';

export const emailConfig: NgModule = {
    imports: [
        CommonModule,
    ],
    declarations: [
        NewEmailComponent
    ],
    entryComponents: [
        
    ],
    exports: [
        
    ],
    providers: [
        EmailService
    ]
}