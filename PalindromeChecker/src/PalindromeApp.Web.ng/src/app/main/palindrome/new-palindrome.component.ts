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
    PalindromeViewModel
} from './shared/palindromeDetailModel';


import { PalindromeService } from './shared/services/palindromeService';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ms-new-palindrome',
    templateUrl: './new-palindrome.component.html',
    styleUrls: ['./new-palindrome.component.css'],
    encapsulation: ViewEncapsulation.Emulated
})

export class NewPalindromeComponent implements OnInit {
    public currentPalindrome: PalindromeViewModel = null;
    public palindromeForm: FormGroup;
    public serverErrorMessage: string;
    public submitClicked: boolean = false;
    public palindromeValueNotFound: boolean = false;

    constructor(
        vcr: ViewContainerRef,
        private formBuilder: FormBuilder,
        private toastr: ToastsManager,
        private router: Router,
        private translateService: TranslateService,
        private location: Location,
        private palindromeService: PalindromeService,
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        this.currentPalindrome = new PalindromeViewModel();

        this.palindromeForm = this.formBuilder.group({
            id: [''],
            txtPalindromeValue: ['', [Validators.required]],
        });
    }


    ngOnInit() {
    }

    private validatePalindrome(data): void {

        if (this.currentPalindrome.palindromeValue.trim() === '') {
            this.palindromeValueNotFound = true;
        }
    }

    onPalindromeValueChange(e) {
        this.serverErrorMessage = '';
        this.palindromeValueNotFound = false;
    }

    submitPalindrome(data) {
        this.validatePalindrome(data);

        if (!(this.palindromeValueNotFound)) {
            this.submitClicked = true;
            this.palindromeService.addPalindrome(this.currentPalindrome)
                .subscribe(response => {

                    if (response.statusCode == 201) {
                        this.currentPalindrome.id = response.content;
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

                    } else if (response.statusCode == 200) {
                        this.serverErrorMessage = response.content;
                        this.submitClicked = false;
                    } else if (response.statusCode == 412) {
                        this.submitClicked = false;
                        this.serverErrorMessage = "Some Detail Missing!";
                    } else {
                        this.submitClicked = false;
                        this.serverErrorMessage = response.content;
                    }
                });
        }
    }
}