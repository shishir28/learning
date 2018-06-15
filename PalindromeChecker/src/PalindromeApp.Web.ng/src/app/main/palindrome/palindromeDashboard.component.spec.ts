import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PalindromeViewModel } from './shared/palindromeDetailModel';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { HttpModule, Http, XHRBackend, RequestOptions, BaseRequestOptions, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { httpFactory } from '../../shared/httpFactory';
import 'rxjs/add/observable/of';

import { DataTablesModule } from 'angular-datatables';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PalindromeDashboardComponent } from './palindromeDashboard.component';
import { PalindromeService } from './shared/services/palindromeService';


let translations: any =
  {
    "general.btAdd": "New Palindrome",
  };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of(translations);
  }
}
/**
  
 */
describe('PalindromeDashboardComponent', () => {
  let component: PalindromeDashboardComponent;
  let fixture: ComponentFixture<PalindromeDashboardComponent>;
  let service: PalindromeService;
  let el: any;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PalindromeDashboardComponent,

      ],
      providers: [TranslateService, PalindromeService,
        {
          provide: Http,
          useFactory: httpFactory,
          deps: [XHRBackend, RequestOptions],
        },
        { provide: XHRBackend, useClass: MockBackend },
        { provide: RequestOptions, useClass: BaseRequestOptions },
        MockBackend],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule,
        DataTablesModule, RouterModule,
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
    fixture = TestBed.createComponent(PalindromeDashboardComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PalindromeService);
    el = fixture.debugElement.nativeElement

  });



  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should have New Palindrome Button', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('New Palindrome');
  }));

});