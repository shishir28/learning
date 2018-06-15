import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

export class NotFoundComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
  }

  goHome() {
    let userType = (sessionStorage.getItem('isInternalUser') ? 'internal' : 'external');
    if (userType === 'external')
      this.router.navigateByUrl('/supplierdashboard');
    else
      this.router.navigateByUrl('/employeedashboard');
  }
}
