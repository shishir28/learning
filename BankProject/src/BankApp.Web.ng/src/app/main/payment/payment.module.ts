import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from './shared/services/paymentService';
import { NewPaymentComponent } from './new-Payment.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

export const paymentConfig: NgModule = {
    imports: [
        CommonModule,
    ],
    declarations: [
     NewPaymentComponent
    ],
    entryComponents: [
        
    ],
    exports: [
        
    ],
    providers: [
        PaymentService
    ]
}