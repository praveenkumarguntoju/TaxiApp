import { Component, OnInit, EventEmitter , Output} from '@angular/core';
import {Http} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  people: any[] = [];
  constructor(private http: Http, private router: Router) {}

  ngOnInit(){
    this.router.navigate(['home']);
  }
}


