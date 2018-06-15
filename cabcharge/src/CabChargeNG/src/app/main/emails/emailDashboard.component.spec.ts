import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailViewModel } from './shared/emailDetailModel';
import { Observable } from 'rxjs/Observable';

import { HttpModule, Http, XHRBackend, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { httpFactory } from '../../shared/httpFactory';
import 'rxjs/add/observable/of';


import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailDashboardComponent } from './emailDashboard.component';
import { EmailService } from './shared/services/emailService';

describe('EmailDashboardComponent', () => {
  let component: EmailDashboardComponent;
  let fixture: ComponentFixture<EmailDashboardComponent>;
  let service: EmailService;
  let el: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmailDashboardComponent,

      ],
      providers: [EmailService,
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions],
        },
        { provide: XHRBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        MockBackend],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, RouterModule
      ]
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(EmailDashboardComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(EmailService);
    el = fixture.debugElement.nativeElement
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should have New Email Button', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('New Email');
  }));

});