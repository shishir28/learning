import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
    PalindromeViewModel
} from '../palindromeDetailModel'
@Injectable()

export class PalindromeService {
    constructor(private http: Http, private location: Location) {
    }


    getAllSavedPalindromes() {
        return this.http.get((this.location.prepareExternalUrl("api/palindrome/getAllSavedPalindromes")))
            .map(res => res.json());
    }

    addPalindrome(palindrome) {
        return this.http.post((this.location.prepareExternalUrl("api/palindrome/addPalindrome")), JSON.stringify(palindrome))
            .map(res => res.json());
    }
}