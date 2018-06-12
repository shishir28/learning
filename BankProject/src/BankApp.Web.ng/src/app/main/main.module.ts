import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app/app.translation.module';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MSNumberFormatter ,MSIntegerFormatter} from '../widgets/numberFormatter.directive';
import { MSNumberPipe } from '../widgets/numberFormatter.pipe';

import { paymentConfig } from './payment/payment.module';
import { HomeComponent } from './home/home.component';
import { PaymentDashboardComponent } from './payment/paymentDashboard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        AppTranslationModule,
         BootstrapModalModule,
         ...paymentConfig.imports,        
    ],

    declarations: [
         HomeComponent,
         PaymentDashboardComponent,
         ...paymentConfig.declarations,
     
        MSNumberPipe,
        MSNumberFormatter,
        MSIntegerFormatter
    ],
    entryComponents: [
    ],
    exports:[
          ...paymentConfig.exports,
         MSNumberPipe,
         MSNumberFormatter,
         MSIntegerFormatter
    ],
    providers: [
         ...paymentConfig.providers,       
        MSNumberPipe
        
    ]
})
export class MainModule { }
