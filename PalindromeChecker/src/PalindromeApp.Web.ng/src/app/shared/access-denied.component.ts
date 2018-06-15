import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
  }

  goHome() {
  }
}
