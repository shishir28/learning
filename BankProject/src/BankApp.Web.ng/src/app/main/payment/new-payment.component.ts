import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { Routes, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import {
    PaymentDetailViewModel
} from './shared/paymentDetailModel';


import { PaymentService } from './shared/services/paymentService';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MSNumberPipe } from '../../widgets/numberFormatter.pipe';

@Component({
    selector: 'ms-new-Payment',
    templateUrl: './new-payment.component.html',
    styleUrls: ['./new-payment.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})

export class NewPaymentComponent implements OnInit {
    public currentPayment: PaymentDetailViewModel = null;
    public paymentForm: FormGroup;
    public serverErrorMessage: string;
    public submitClicked: boolean = false;
    public BSBNotFound: boolean = false;
    public accountNumberNotFound: boolean = false;
    public accountNameNotFound: boolean = false;
    public invalidAmount: boolean = false;

    constructor(
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private toastr: ToastsManager,
        private router: Router,
        private translateService: TranslateService,
        private location: Location,
        private paymentService: PaymentService,
        private numberPipe: MSNumberPipe,
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.currentPayment = new PaymentDetailViewModel();

        this.paymentForm = this.formBuilder.group({
            id: [''],
            txtBSB: ['', [Validators.required]],
            txtAccountNumber: ['', [Validators.required]],
            txtAccountName: ['', [Validators.required]],
            txtReference: ['', [Validators.required]],
            numAmount: [0],
        });
    }


    ngOnInit() {
    }

    private validatePaymentDetail(data): void {

        if (this.currentPayment.BSB.trim() === '') {
            this.BSBNotFound = true;
        }

        if (this.currentPayment.accountNumber.trim() === '') {
            this.accountNumberNotFound = true;
        }

        if (this.currentPayment.accountName.trim() === '') {
            this.accountNameNotFound = true;
        }
        debugger;
        if ( (!this.currentPayment.amount) || ( this.currentPayment.amount < 1)) {
            this.invalidAmount = true;
        }
    }

    onAmountChange(event) {
        this.invalidAmount = false;
        if (event.target && event.target.value) {
            let newValue = parseFloat(this.numberPipe.transform(event.target.value, 2).replace(',', ''));
            this.currentPayment.amount = newValue;

            if (newValue < 1)
                this.invalidAmount = true;
        }
    }

    submitPayment(data) {
        this.validatePaymentDetail(data);

        if (!(this.BSBNotFound || this.accountNumberNotFound || this.accountNameNotFound || this.invalidAmount)) {
            this.submitClicked = true;
            this.paymentService.addPayment(this.currentPayment)
                .subscribe(response => {
                    console.log(response);     
                    if (response.statusCode == 201) {
                        this.currentPayment.id = response.content;

                        let title = '';
                        let message = '';

                        this.translateService.get('general.informationTitle')
                            .subscribe((res: string) =>
                                title = res
                            );

                        this.translateService.get('general.submitSucessMessage')
                            .subscribe((res: string) =>
                                message = res
                            );

                        this.toastr.success(message, title, )
                            .then((toast: Toast) => {
                                setTimeout(() => {
                                    this.router.navigateByUrl('/dashboard');
                                }, 5000);
                            });

                    } else if (response.statusCode == 412) {
                        this.serverErrorMessage = "Some Detail Missing!";

                    } else {
                        this.serverErrorMessage = response.content;
                    }
                });
        }
    }    
}