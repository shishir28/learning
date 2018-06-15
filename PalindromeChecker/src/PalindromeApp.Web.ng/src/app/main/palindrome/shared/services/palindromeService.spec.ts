import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { PalindromeService } from './palindromeService';

describe('PalindromeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({

      providers: [PalindromeService, Location,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        {
          provide: Http,
        }],

    });
  });

  it('should be created', inject([PalindromeService], (service: PalindromeService) => {
    expect(service).toBeTruthy();
  }));
});