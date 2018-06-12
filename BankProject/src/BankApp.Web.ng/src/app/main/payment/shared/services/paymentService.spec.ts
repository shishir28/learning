import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { PaymentService } from './paymentService';

describe('PaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [PaymentService, Location,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
          provide: Http,
        }],

    });
  });

  it('should be created', inject([PaymentService], (service: PaymentService) => {
    expect(service).toBeTruthy();
  }));
});