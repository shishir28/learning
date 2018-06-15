import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
    EmailViewModel
} from '../emailDetailModel'
@Injectable()

export class EmailService {
    constructor(private http: Http, private location: Location) {

    }

    sendEmail(email:EmailViewModel) {
        return this.http.post((this.location.prepareExternalUrl("api/email/sendEmail")), JSON.stringify(email))
            .map(res => res.json());
    }

}