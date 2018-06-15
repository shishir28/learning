import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailViewModel } from './shared/emailDetailModel';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { httpFactory } from '../../shared/httpFactory';
import 'rxjs/add/observable/of';


import { NewEmailComponent } from './new-email.component';
import { EmailService } from './shared/services/emailService';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NewEmailComponent', () => {
    let component: NewEmailComponent;
    let fixture: ComponentFixture<NewEmailComponent>;
    let service: EmailService;
    let el: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewEmailComponent,

            ],
            providers: [EmailService,
                {
                    provide: Http,
                }],
            imports: [RouterTestingModule, ReactiveFormsModule, FormsModule]
        }).compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(NewEmailComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(EmailService);
        el = fixture.debugElement.nativeElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('On Page Load ', () => {
        // submit button is disable check
        let submitEl = fixture.debugElement.query(By.css('#submitEmail'));
        expect(submitEl.nativeElement.disabled).toBeTruthy();
        // check existence of other controls
        let txtToValue = el.querySelector('input[formControlName=txtEmailTo]');
        expect(txtToValue).toBeTruthy();
    });


    it('Valid Form', () => {
        expect(fixture.componentInstance.emailForm.valid).toBeFalsy();
        fixture.componentInstance.emailForm.controls['txtEmailTo'].setValue('shishir28@gmail.com');
        fixture.componentInstance.emailForm.controls['txtEmailSubject'].setValue('Hello');        
        fixture.detectChanges();
        expect(fixture.componentInstance.emailForm.valid).toBeTruthy();
    });

});
