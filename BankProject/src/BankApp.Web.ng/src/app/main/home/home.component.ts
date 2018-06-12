import {
    Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
    ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Routes } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'ms-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
    private _routerEventsSubscription: Subscription;
    quickpanelOpen: boolean = false;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

    onActivate(e, scrollContainer) {

    }
}