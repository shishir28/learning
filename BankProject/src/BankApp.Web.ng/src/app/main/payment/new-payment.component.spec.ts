import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentDetailViewModel } from './shared/paymentDetailModel';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { httpFactory } from '../../shared/httpFactory';
import 'rxjs/add/observable/of';


import { NewPaymentComponent } from './new-Payment.component';
import { PaymentService } from './shared/services/paymentService';
import { MSNumberPipe } from '../../widgets/numberFormatter.pipe';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

let translations: any =
    {
        "general.btAdd": "New Payment",
        "paymentDetail.lblMain": "Account Number",
        "paymentDetail.lblAccountNumber": "Account Number",
        "paymentDetail.lblAccountName": "Account Name",
        "paymentDetail.lblBSB": "BSB",
        "paymentDetail.lblReference": "Reference",
        "paymentDetail.btnSubmit": "Submit Payment"
    };

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(translations);
    }
}

describe('NewPaymentComponent', () => {
    let component: NewPaymentComponent;
    let fixture: ComponentFixture<NewPaymentComponent>;
    let service: PaymentService;
    let el: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewPaymentComponent,
                MSNumberPipe
            ],
            providers: [TranslateService, PaymentService, MSNumberPipe,
                {
                    provide: Http,
                }],
            imports: [RouterTestingModule, ReactiveFormsModule, FormsModule,

                ToastModule.forRoot(),
                TranslateModule.forRoot({
                    loader: { provide: TranslateLoader, useClass: FakeLoader },
                })
            ]
        }).compileComponents();
    }));


    beforeEach(inject([TranslateService], (service: TranslateService) => {
        service.use('en');
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(NewPaymentComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(PaymentService);
        el = fixture.debugElement.nativeElement

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('On Page Load ', () => {
        // submit button is disable check
        let submitEl = fixture.debugElement.query(By.css('#submitPayment'));
        expect(submitEl.nativeElement.disabled).toBeTruthy();
        // check existence of othjer controls

        let txtAccountName = el.querySelector('input[formControlName=txtAccountName]');
        expect(txtAccountName).toBeTruthy();

        let txtAccountNumber = el.querySelector('input[formControlName=txtAccountNumber]');
        expect(txtAccountNumber).toBeTruthy();

        let txtBSB = el.querySelector('input[formControlName=txtBSB]');
        expect(txtBSB).toBeTruthy();

        let txtReference = el.querySelector('input[formControlName=txtReference]');
        expect(txtReference).toBeTruthy();

        let numAmount = el.querySelector('input[formControlName=numAmount]');
        expect(numAmount).toBeTruthy();
    });


    it('Invalid BSB', () => {
        fixture.componentInstance.paymentForm.controls['txtBSB'].setValue('1234567');
        fixture.detectChanges();
        let validBSB = fixture.componentInstance.paymentForm.controls['txtBSB'].valid;
        expect(validBSB).toBeFalsy();
    });

    it('Valid BSB', () => {
        fixture.componentInstance.paymentForm.controls['txtBSB'].setValue('123456');
        let validBSB = fixture.componentInstance.paymentForm.controls['txtBSB'].valid;
        fixture.detectChanges();
        expect(validBSB).toBeTruthy();
    });

    it('Invalid Account Number', () => {
        fixture.componentInstance.paymentForm.controls['txtAccountNumber'].setValue('1267');
        let validAccountNumber = fixture.componentInstance.paymentForm.controls['txtAccountNumber'].valid;
        expect(validAccountNumber).toBeFalsy();
    });

    it('Valid Account Number', () => {
        fixture.componentInstance.paymentForm.controls['txtAccountNumber'].setValue('12345678');
        let validAccountNumber = fixture.componentInstance.paymentForm.controls['txtAccountNumber'].valid;
        expect(validAccountNumber).toBeTruthy();
    });

    it('Account Name Not Given', () => {
        fixture.componentInstance.paymentForm.controls['txtAccountName'].setValue('');
        let validAccountName = fixture.componentInstance.paymentForm.controls['txtAccountName'].valid;
        expect(validAccountName).toBeFalsy();
    });

    it('Valid Account Number', () => {
        fixture.componentInstance.paymentForm.controls['txtAccountName'].setValue('John');
        let validAccountName = fixture.componentInstance.paymentForm.controls['txtAccountName'].valid;
        expect(validAccountName).toBeTruthy();
    });

    it('Valid Form', () => {
        expect(fixture.componentInstance.paymentForm.valid).toBeFalsy();
        fixture.componentInstance.paymentForm.controls['txtBSB'].setValue('123456');
        fixture.componentInstance.paymentForm.controls['txtAccountNumber'].setValue('12345678');
        fixture.componentInstance.paymentForm.controls['txtAccountName'].setValue('John');
        fixture.componentInstance.paymentForm.controls['txtReference'].setValue('For Jane');
        fixture.componentInstance.paymentForm.controls['numAmount'].setValue(1.2);
        fixture.detectChanges();
        expect(fixture.componentInstance.paymentForm.valid).toBeTruthy();
    });


});
