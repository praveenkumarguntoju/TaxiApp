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
  token:any;
  driverActive:boolean;
  displayDetail:any = true;
  private subscription: Subscription;
  userAddress:any;

  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.subscription = actRoute.queryParamMap.subscribe(params => {
         debugger;
              this.id =  params.get('idData') || 'None';
              // this.token =  params.get('tokenData') || 'None'
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
   onCancel(eve){
     this.driverDetails.CABBOOKED = false;
     this.updateDetails(eve);
   }
  
  assignData(response){
     var contacts = JSON.parse(response._body);
      if(contacts.data){
                   debugger;
                    this.id = contacts.data._id;
                    this.driverDetails = contacts.data;
                    this.imageUrl = contacts.data.picFile;
                    if(contacts.data.lat){
                    this.userAddress = "https://maps.google.com/maps/?q="+ contacts.data.lat+ ','+ contacts.data.lng;
                    }
                  }else{
        this.router.navigate(['register'], {queryParams: {'qdata': 200}, preserveQueryParams: true});
      }
    document.getElementById("myDiv").style.display = "none";
  }

 getDetails(id) {
    debugger;
    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
    if(sessionStorage.isDriverActive == "true"){
         id = sessionStorage.userName;
         this.driverActive = true;
         var contactsUrl = '/app/contacts' + '/' + id +'?username=' + sessionStorage.userName
    }else{
         this.driverActive = false;
          var contactsUrl = '/app/contacts' + '/' + id
    }
    const bodyData = {'driver':true};
    const options = new RequestOptions({ headers: header});
    this.http.get(contactsUrl,{ headers: header})
                 .toPromise()
                 .then((response)=>{
             debugger;
                 this.assignData(response);
                 }).catch(this.handleError); 
  };
   
  // delete
   onDelete(eve){
    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
    const body = {'action': 'getData'};
    const options = new RequestOptions({ headers: header});
    var contactsUrl = '/app/contacts/delete' + '/' + this.id;
    this.http.get(contactsUrl,{ headers: header })
                 .toPromise()
                 .then((response)=>{
             window.alert("Data was successfully deleted");
        this.router.navigate(['register'], {queryParams: {'qdata': 200}, preserveQueryParams: true});
                 
       }).catch(this.handleError); 
  };


  updateDetails(evt) {
    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
    const body = {'action': 'updateDetail', 'data': this.driverDetails};
    const options = new RequestOptions({ headers: header});
     var contactsUrl = '/app/contacts' + '/' + this.id;
      this.http.put(contactsUrl,this.driverDetails,{ headers: header })
                 .toPromise()
                 .then((response)=>{
                    debugger;
                 this.assignData(response);
                 alert("Hello! User details was successfully updated..!");
                 if(!this.driverActive){
                 this.router.navigate(['home']);
                 }
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
