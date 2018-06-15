import {
    Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
    ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Routes, Router, ActivatedRoute } from '@angular/router';
import { EmailViewModel } from './shared/emailDetailModel';
import { EmailService } from './shared/services/emailService';



@Component({
    selector: 'ms-emailDashboard',
    templateUrl: './emailDashboard.component.html',
    encapsulation: ViewEncapsulation.None
})

export class EmailDashboardComponent implements OnInit {
    
    public email: EmailViewModel[] = null;
    public loading: Boolean = false;
    
    
    
  

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private emailService: EmailService,
    ) {

    }

    ngOnInit() {
       
    }

    addNewEmail(e) {        
        this.router.navigateByUrl('/newEmail');
    }
}


