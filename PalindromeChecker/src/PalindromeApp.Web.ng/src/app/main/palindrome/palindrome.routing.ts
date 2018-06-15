import { Routes, RouterModule } from '@angular/router';
import { NewPalindromeComponent } from './new-Palindrome.component';

export const palindromeRoutes: Routes = [
    {
        path: 'newPalindrome',
        component: NewPalindromeComponent,
        pathMatch: 'full',
    }
];