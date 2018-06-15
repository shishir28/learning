import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from "./shared/not-found.component";
import { AccessDeniedComponent } from "./shared/access-denied.component";
import { InternalServerErrorComponent } from './shared/internal-server-error.component';

// ---------Routes----------
import { mainRoutes } from './main/main-routing.module';
//-------------

import { HomeComponent } from "./main/home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            ...mainRoutes,
        ]
    },
    { path: 'notFound', component: NotFoundComponent },
    { path: 'accessDenied', component: AccessDeniedComponent },
    { path: 'internalServerError', component: InternalServerErrorComponent },
    { path: '**', redirectTo: '/notFound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule { }
