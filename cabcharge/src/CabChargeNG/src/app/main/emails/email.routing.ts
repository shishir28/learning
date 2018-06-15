import { Routes, RouterModule } from '@angular/router';
import { NewEmailComponent } from './new-Email.component';

export const emailRoutes: Routes = [
    {
        path: 'newEmail',
        component: NewEmailComponent,
        pathMatch: 'full',
    }
];