import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  imageUrl: string;
  driverDetails: any = {};
  public id: string;
  displayDetail:any = true;
  private subscription: Subscription;

  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.subscription = actRoute.queryParamMap.subscribe(params => {
         debugger;
              this.id =  params.get('idData') || 'None'
      });
   }

   onEdit(eve){
     // tslint:disable-next-line:no-debugger
     debugger;
     this.displayDetail = false;
   } 

    onDisplay(eve){
     // tslint:disable-next-line:no-debugger
     this.displayDetail =  true;
   }
  
  onHome(eve){
     this.router.navigate(['home']);
   }
  
  assignData(response){
     var contacts = JSON.parse(response._body);
      if(contacts.data){
                   debugger;
                    this.driverDetails = contacts.data;
                    this.imageUrl = contacts.data.picFile;
      } 
    document.getElementById("myDiv").style.display = "none";
  }

 getDetails(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'getDetail', 'data':id};
    const options = new RequestOptions({ headers: headers});
    var contactsUrl = '/app/contacts' + '/' + id;
    this.http.get(contactsUrl)
                 .toPromise()
                 .then((response)=>{
             debugger;
                 this.assignData(response);
                 }).catch(this.handleError); 
  };


  updateDetails(evt) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'updateDetail', 'data': this.driverDetails};
    const options = new RequestOptions({ headers: headers});
     var contactsUrl = '/app/contacts' + '/' + this.id;
      this.http.put(contactsUrl,this.driverDetails)
                 .toPromise()
                 .then((response)=>{
                    debugger;
                 this.assignData(response);
                 alert("Hello! User details was successfully updated..!");
                 this.router.navigate(['home']);
                 }).catch(this.handleError); 
 };
  
  
   private handleError (error: any): Promise<any> {
       debugger;
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Promise.reject(errMsg);
    }



  ngOnInit() {
  
    
    this.subscription.unsubscribe();
    this.getDetails(this.id);
  }

}
