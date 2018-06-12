import { Routes, RouterModule } from '@angular/router';
import { NewPaymentComponent } from './new-Payment.component';

export const paymentRoutes: Routes = [
    {
        path: 'newPayment',
        component: NewPaymentComponent,
        pathMatch: 'full',
    }
];