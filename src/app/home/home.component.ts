import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { Http ,  Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router,  ActivatedRoute  } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
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
  cmntData:any;
  id:any;
  token:any;
  comntObj:any;
  private subscription: Subscription;
  comments: any[] = [{ 
 "username":"Praveen",
 "date":"22-08-2017",
 "rate":"sentiment_dissatisfied",
 "comment":"this was nice in buy. this was nice in buy this was nice in buy this was nice in buy this was nice in buy this was nice in buy"
}]
 

  ngOnInit(){
    this.subscription.unsubscribe();
    document.getElementById("myDiv").style.display = "block";
    this.getAllPeople(this.people);

  }
  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {

    this.subscription = actRoute.queryParamMap.subscribe(params => {
      debugger;
           this.token =  params.get('tokenData') || 'None'
   });
  }
  
//   onClickHome(eve){
    
//   }
  
//   commentsData
  
commentGet(res){
    var comments = JSON.parse(res._body);
    if(comments.data)
     this.comments = comments.data;
     document.getElementById("myDiv").style.display = "none";
      
  };

 onClickReview(eve){
   this.id = eve._id
  
  var contactsUrl = '/app/comments' + '/' + this.id;
      this.http.get(contactsUrl,this.comments)
                 .toPromise()
                 .then((response)=>{
                    debugger;
                  this.commentGet(response);
                 }).catch(this.handleError);
};
//   comments end
  
  
  onSaveReview(eve){
     debugger;
     var cmntObj = {};
     var d= new Date();
     this.comments.push({ 
       "userId": this.id,
       "username":"Praveen",
       "rate" : "sentiment_dissatisfied",
       "comment" : this.cmntData,
       "date" : d.toDateString()
     });
   
   this.comntObj = { 
       "userId": this.id,
       "username":"Praveen",
       "rate" : "sentiment_dissatisfied",
       "comment" : this.cmntData,
       "date" : d.toDateString()
     };
    
    
    this.http.post('/app/comments',this.comntObj)
                 .toPromise()
                 .then((response)=>{
                    debugger;
                 alert("User review was successfully created..");
                 document.getElementById("myDiv").style.display = "none";
               
                 }).catch(this.handleError); 
     
  };
  
   onClickMe(eve){
     // tslint:disable-next-line:no-debugger
     debugger;
      let navigationExtras = {
      queryParams: { 'idData': eve._id,
                     'tokenData':this.token}
    };
      document.getElementById("myDiv").style.display = "block";
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
     document.getElementById("myDiv").style.display = "none";
      
  }

   getAllPeople(people) {
    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': this.token });
    const body = {'action': 'getData'};
    const options = new RequestOptions({ headers: header});
    this.http.get('/app',{ headers: header })
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
