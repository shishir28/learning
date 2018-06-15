import {
    Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit, ViewChildren, QueryList,
    ElementRef, OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { Routes, Router, ActivatedRoute } from '@angular/router';
import { PalindromeViewModel } from './shared/palindromeDetailModel';
import { PalindromeService } from './shared/services/palindromeService';



@Component({
    selector: 'ms-palindromeDashboard',
    templateUrl: './palindromeDashboard.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PalindromeDashboardComponent implements OnInit {
    private userRole: string = '';
    public palindrome: PalindromeViewModel[] = null;
    public loading: Boolean = false;
    public palidromeList: PalindromeViewModel[] = null;
    public dataFound: boolean = false;
    public dtOptions: DataTables.Settings = {};
    public dtTrigger: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private palindromeService: PalindromeService,
    ) {

    }

    ngOnInit() {
        this.dtOptions = {
            "info": false,
            scrollX: true,
            "paging": true,
            pagingType: 'full_numbers',
            pageLength: 25
        };
        this.palindromeService.getAllSavedPalindromes()
            .subscribe(data => {
                this.dataFound = (data.length > 0);
                this.palidromeList = data;
            });
    }

    addNewPalindrome(e) {
        
        this.router.navigateByUrl('/newPalindrome');
    }
}


