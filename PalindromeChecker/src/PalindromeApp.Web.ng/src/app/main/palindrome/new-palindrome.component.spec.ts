import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PalindromeViewModel } from './shared/palindromeDetailModel';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { httpFactory } from '../../shared/httpFactory';
import 'rxjs/add/observable/of';


import { NewPalindromeComponent } from './new-Palindrome.component';
import { PalindromeService } from './shared/services/palindromeService';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

let translations: any =
    {
        "general.btAdd": "New Palindrome",       
        "palindromeDetail.lblBSB": "BSB",        
        "palindromeDetail.btnSubmit": "Submit Palindrome"
    };

class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        return Observable.of(translations);
    }
}

describe('NewPalindromeComponent', () => {
    let component: NewPalindromeComponent;
    let fixture: ComponentFixture<NewPalindromeComponent>;
    let service: PalindromeService;
    let el: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewPalindromeComponent,
                
            ],
            providers: [TranslateService, PalindromeService,
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
        fixture = TestBed.createComponent(NewPalindromeComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(PalindromeService);
        el = fixture.debugElement.nativeElement

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('On Page Load ', () => {
        // submit button is disable check
        let submitEl = fixture.debugElement.query(By.css('#submitPalindrome'));
        expect(submitEl.nativeElement.disabled).toBeTruthy();
        // check existence of othjer controls

        let txtPalindrome = el.querySelector('input[formControlName=txtPalindromeValue]');
        expect(txtPalindrome).toBeTruthy();
     
    });


    it('Valid Form', () => {
        expect(fixture.componentInstance.palindromeForm.valid).toBeFalsy();
        fixture.componentInstance.palindromeForm.controls['txtPalindromeValue'].setValue('123456');
        fixture.detectChanges();
        expect(fixture.componentInstance.palindromeForm.valid).toBeTruthy();
    });

});
