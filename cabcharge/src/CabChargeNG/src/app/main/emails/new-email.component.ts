import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList, ElementRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { Routes, Router, NavigationEnd } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

import {
    EmailViewModel
} from './shared/emailDetailModel';


import { EmailService } from './shared/services/emailService';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ms-new-email',
    templateUrl: './new-email.component.html',
    styleUrls: ['./new-email.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})

export class NewEmailComponent implements OnInit {
    public currentEmail: EmailViewModel = null;
    public emailForm: FormGroup;
    public serverErrorMessage: string;
    public submitClicked: boolean = false;
    public toValueHasError: boolean = false;
    public ccValueHasError: boolean = false;
    public bccValueHasError: boolean = false;

    constructor(
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private router: Router,
        private location: Location,
        private emailService: EmailService,
    ) {

        this.currentEmail = new EmailViewModel();
        let emailPattern = '/[\w.+-]+@[\w.+-]+\.[a-zA-Z0-9]{2,4}(,\s*)*/ig';
        this.emailForm = this.formBuilder.group({
            txtEmailTo: ['', [Validators.required]],
            txtEmailCC: ['',],
            txtEmailBCC: ['',],
            txtEmailSubject: ['', [Validators.required]],
            txtEmailMessage: ['',],
        });
    }


    ngOnInit() {
    }

    private validateData(data): void {

    }

    onToValueChange(e) {
        this.toValueHasError  = false;
        this.toValueHasError = !this.validateEmailAddress(this.currentEmail.toValue);
    }

    onCCValueChange(e) {
        this.ccValueHasError = false;
        let currentCCEmailAddress = (this.currentEmail.ccValue).replace(/\s/g, "");
        if (currentCCEmailAddress) {
            this.ccValueHasError = !this.validateEmailAddress(currentCCEmailAddress);
        }
    }

    onBCCValueChange(e) {
        this.bccValueHasError = false;        
        let currentBCCEmailAddress = (this.currentEmail.bccValue).replace(/\s/g, "");
        if (currentBCCEmailAddress) {
            this.bccValueHasError = !this.validateEmailAddress(currentBCCEmailAddress);
        }
    }


    private validateEmailAddress(emailAddress: string): boolean {
        let currentToEmailAddress = (emailAddress).replace(/\s/g, "");
        let validationResult = (/^(,?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/.test(currentToEmailAddress));
        return validationResult;

    }

    sendEmail(data) {
        this.validateData(data);

        if (!(this.toValueHasError) && !(this.ccValueHasError)) {
            this.submitClicked = true;
            this.emailService.sendEmail(this.currentEmail)
                .subscribe(response => {
                    if (response.statusCode == 201) {
                        alert('Email Sent')
                        this.router.navigateByUrl('/dashboard');
                    } else if (response.statusCode == 412) {
                        this.submitClicked = false;
                        this.serverErrorMessage = "Some  attributes missing for email!";
                    } else {
                        this.submitClicked = false;
                        this.serverErrorMessage = response.content;
                    }
                });
        }
    }
}
