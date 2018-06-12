import {
    Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
    ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Routes, Router, ActivatedRoute } from '@angular/router';
import { PaymentDetailViewModel } from './shared/paymentDetailModel';

//import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'ms-paymentDashboard',
    templateUrl: './paymentDashboard.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PaymentDashboardComponent implements OnInit {
    private userRole: string = '';
    public payment: PaymentDetailViewModel[] = null;
    public loading: Boolean = false;
    constructor(
        private router: Router,
       // private translateService: TranslateService,
        private route: ActivatedRoute,
    ) {
       
    }

    ngOnInit() {
          this.loading = true;
    }

    addNewPayment(e) {
        this.router.navigateByUrl('/newPayment');
    }
}


