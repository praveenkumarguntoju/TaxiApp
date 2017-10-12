import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//   API = 'http://localhost:3000';
  self = this;
  driverDetails: any = {
        'DRVFNAME': '',
        'DRVLNAME': '',
        'DRVAGE': '',
        'CARNUM': '',
        'CARNAME': '',
        'ADDRS1': '',
        'ADDRS2': '',
        'CITY': '',
        'ZIPCODE': '',
        'COUNTRY': '',
        'PHNO': '',
        'picFile': ''
    };
    ele = document.getElementsByClassName('fileUpload');

  constructor(private http: Http, private router: Router) { }

     // tslint:disable-next-line:member-ordering

 
   getBase64(file) {
        // tslint:disable-next-line:no-debugger
       const reader = new FileReader();
        reader.readAsDataURL(file);
        // tslint:disable-next-line:no-shadowed-variable
        // reader.onload = function (self) {
    reader.onload = (e) => {
    console.log(reader.result);
     const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'upLoad', 'data': reader.result, 'fileName': file.name};
    //  const options = new RequestOptions();
    this.http.post('/app', body)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.driverDetails.picFile  = 'app/images/' + data.filename;
      });
    };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    uploadImage(eve){
      // tslint:disable-next-line:no-debugger
      debugger;
     // tslint:disable-next-line:prefer-const
     let files: any;
     const filEle = document.getElementsByClassName('fileUpload')[0];
     const file = filEle['files'];
     if (file.length > 0) {
          this.getBase64(file[0]);
        }
    };

     saveDetails(event){
       const headers = new Headers({ 'Content-Type': 'application/json' });
       const body = {'action': 'create', 'data': this.driverDetails};
       const options = new RequestOptions({ headers: headers});
        this.http.post('/app', body, options)
        .map(res => res.json())
        .subscribe(data => {
         debugger;
        console.log(data);
        this.driverDetails = data;
      });
     };


 ngOnInit() {
  }

}
