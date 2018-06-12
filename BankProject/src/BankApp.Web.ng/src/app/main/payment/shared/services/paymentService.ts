import { Http, URLSearchParams, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {
    PaymentDetailViewModel
} from '../paymentDetailModel'
@Injectable()

export class PaymentService {
    constructor(private http: Http, private location: Location) {
    }

    addPayment(payment) {
        return this.http.post((this.location.prepareExternalUrl("api/payment/addPayment")), JSON.stringify(payment))
            .map(res => res.json());
    }
}