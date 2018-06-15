import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { emailRoutes } from './emails/email.routing';
import { EmailDashboardComponent } from './emails/emailDashboard.component';

export const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',       
    },
    {
        path: 'dashboard',
        component: EmailDashboardComponent,
        pathMatch: 'full',
    },
    ...emailRoutes
    
];
