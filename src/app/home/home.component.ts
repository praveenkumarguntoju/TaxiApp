import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { Http ,  Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
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
      let navigationExtras: NavigationExtras = {
      queryParams: { 'idData': eve._id}
    };
      this.router.navigate(['details',eve.CARNUM],navigationExtras);
   }

    onRegister(eve){
     // tslint:disable-next-line:no-debugger
     debugger;
     this.router.navigate(['register'], {queryParams: {'qdata': 200}, preserveQueryParams: true});
    }

  dataGet(res){
    var contacts = JSON.parse(res._body);
    if(contacts.data)
     this.people = contacts.data;
      
  }

   getAllPeople(people) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'getData'};
    const options = new RequestOptions({ headers: headers});
    this.http.get('/app')
                 .toPromise().then((response)=>{
                this.dataGet(response);
       }).catch(this.handleError); 
  };
  
  
   private handleError (error: any): Promise<any> {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }
  
}
