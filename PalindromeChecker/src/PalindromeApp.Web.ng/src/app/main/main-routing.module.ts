import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { palindromeRoutes } from './palindrome/palindrome.routing';
import { PalindromeDashboardComponent } from './palindrome/palindromeDashboard.component';

export const mainRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
       
    },
    {
        path: 'dashboard',
        component: PalindromeDashboardComponent,
        pathMatch: 'full',
    },
    ...palindromeRoutes
    
];
