import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { paymentRoutes } from './payment/payment.routing';
import { PaymentDashboardComponent } from './payment/paymentDashboard.component';

export const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
       
    },
    {
        path: 'dashboard',
        component: PaymentDashboardComponent,
        pathMatch: 'full',
    },
    ...paymentRoutes
    
];
