import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { DropdownComponent } from '../dropdown/dropdown/dropdown.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

//   API = 'http://localhost:3000';
//   path = 'app/jsonfiles/makes.json';
  people: any[] = [];
 

  ngOnInit(){
    this.getAllPeople(this.people);
  }
  constructor(private http: Http, private router: Router) {}
   onClickMe(eve){
     // tslint:disable-next-line:no-debugger
     debugger;
     this.router.navigate(['details', eve.CARNUM], {queryParams: {'qdata': 200}, preserveQueryParams: true});
   }

    onRegister(eve){
     // tslint:disable-next-line:no-debugger
     debugger;
     this.router.navigate(['register'], {queryParams: {'qdata': 200}, preserveQueryParams: true});
    }

   getAllPeople(people) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'getData'};
    const options = new RequestOptions({ headers: headers});
    this.http.post(`/app`, body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.people = data.driverData;
      });
  };
}
