import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PaymentDashboardComponent } from './paymentDashboard.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaymentDetailViewModel } from './shared/paymentDetailModel';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

let translations: any = { "general.btAdd": "New Payment" };

// class FakeLoader implements TranslateLoader {
//   getTranslation(lang: string): Observable<any> {
//     return Observable.of(translations);
//   }
// }


describe('PaymentDashboardComponent', () => {
  let component: PaymentDashboardComponent;
  let fixture: ComponentFixture<PaymentDashboardComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PaymentDashboardComponent
      ],
      providers: [TranslateService],
      imports: [RouterTestingModule,
        // TranslateModule.forRoot({
        //   loader: {provide: TranslateLoader, useClass: FakeLoader},
        // })
      ]
    }).compileComponents();
  }));


  // beforeEach(inject([TranslateService], (service: TranslateService) => {
  //   service.use('en');
  // }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  it('should have Fictitious Bank in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Fictitious Bank Home Page!');
  }));

  it('should have Fictitious Bank in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Fictitious Bank Home Page!');
  }));

});