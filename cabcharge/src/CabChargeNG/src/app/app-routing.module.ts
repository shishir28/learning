import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule { }
