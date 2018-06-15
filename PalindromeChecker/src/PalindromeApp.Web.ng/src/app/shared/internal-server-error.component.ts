import { Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.css']
})
export class InternalServerErrorComponent implements OnInit {


  constructor(private router: Router,
    private route: ActivatedRoute, ) { }

  ngOnInit() {
  }

  goHome() {
  

  }
}
