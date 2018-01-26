import { Component, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private accountService:AccountService) { 
  }

  ngOnInit() {
      this.accountService.InitializeAccount();
  }
}
