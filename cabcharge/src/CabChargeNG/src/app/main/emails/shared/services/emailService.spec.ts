import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { EmailService } from './emailService';

describe('EmailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [EmailService, Location,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
          provide: Http,
        }],
    });
  });

  it('should be created', inject([EmailService], (service: EmailService) => {
    expect(service).toBeTruthy();
  }));
});