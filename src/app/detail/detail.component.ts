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
  API = 'http://localhost:3000';
  private subscription: Subscription;

  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {
    // tslint:disable-next-line:no-debugger
    debugger;
      this.subscription = this.router.routerState
                            .queryParams.subscribe(params => {
         debugger;
        this.id =  params['idData'];
      });
//     this.subscription = actRoute.queryParams.subscribe(queryParams => {
//        this.id =  queryParams['idData'];
//     });
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
  
  assignData(response){
     var contacts = JSON.parse(response._body);
      if(contacts.data){
                   debugger;
                    this.driverDetails = contacts.data;
                    this.imageUrl = contacts.data.picFile;
      } 
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
    this.http.post(`${this.API}/app`, body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        // this.driverDetails = data.driverDetail;
      });
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
