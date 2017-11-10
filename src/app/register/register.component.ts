import { Component, OnInit } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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

 onLoadReader(reader){
   this.driverDetails.picFile = reader.result;
 }
  
 
  
//   document.getElementById('imageinput').addEventListener('change', function(event) {
//     var img = new Image();
//     img.onload = function(){
//      var oc = document.createElement('canvas'),
//         octx = oc.getContext('2d');
//   debugger;
//     oc.width = img.width * 0.1;
//     oc.height = img.height * 0.1;
//     octx.drawImage(img, 0, 0, oc.width, oc.height);
        
//         this.driverDetails.picFile = oc.toDataURL('image/jpeg');
     
//     };
//     debugger;
//     img.src = URL.createObjectURL(event.target.files[0]);
//   });
  
  
  
  
  
  
  
  
  
   getBase64(file) {
       debugger;
        // tslint:disable-next-line:no-debugger
       const reader = new FileReader();
        reader.readAsDataURL(file);
      reader.onload = (e) =>  this.onLoadReader(reader);
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    uploadImage(eve){
     debugger;
     let files: any;
     const filEle = document.getElementsByClassName('fileUpload')[0];
     const file = filEle['files'];
     var img = new Image();
    
    img.onload = function(){
     var oc = document.createElement('canvas'),
       octx = oc.getContext('2d');
  debugger;
    oc.width = img.width * 0.1;
    oc.height = img.height * 0.1;
    octx.drawImage(img, 0, 0, oc.width, oc.height);
     this.driverDetails.picFile = oc.toDataURL('image/jpeg');
     
    }.bind(this);
    img.src = URL.createObjectURL(file[0]);
    if (file.length > 0) {
//           this.getBase64(file[0]);
        }
    };

     cancel(event){
           this.router.navigate(['home']);
     };       
  
     saveDetails(event){
       document.getElementById("myDiv").style.display = "block";
       const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
       const body = {'action': 'create', 'data': this.driverDetails};
       const options = new RequestOptions({ headers: header});
       
       this.http.post('/app/contacts',this.driverDetails,{ headers: header})
                 .toPromise()
                 .then((response)=>{
                    debugger;
                 alert("User was successfully created..");
                 document.getElementById("myDiv").style.display = "none";
                 this.router.navigate(['home']);
                 }).catch(this.handleError); 
         };
  
   private handleError (error: any): Promise<any> {
       debugger;
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    };


 ngOnInit() {
  }

}
