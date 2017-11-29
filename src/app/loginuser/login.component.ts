import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { Http ,  Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

  people: any[] = [];
  cmntData:any;
  id:any;
  comments: any[] = [];
 
  userObj: any = {
    'username': '',
     'email': ''
      };

      // 'password': '',





  ngOnInit(){
    
   }
  
   constructor(private http: Http, private router: Router) {}
  

  
//   commentsData
  
// commentGet(res){
//     var comments = JSON.parse(res._body);
//     if(comments.data)
//      this.comments = comments.data;
//      document.getElementById("myDiv").style.display = "none";
      
//   };

//  onClickReview(eve){
//    this.id = eve._id
//   var contactsUrl = '/app/comments' + '/' + this.id;
//       this.http.get(contactsUrl,this.comments)
//                  .toPromise()
//                  .then((response)=>{
//                     debugger;
//                   this.commentGet(response);
//                  }).catch(this.handleError);
// };
//   comments end
  
  
  onSaveuser(eve){
     debugger;
     var cmntObj = {};
     var d= new Date();
     this.http.post('/app/registeruser',this.userObj)
                 .toPromise()
                 .then((response)=>{
                    debugger;
                 alert("User  was successfully created..");
                 document.getElementById("myDiv").style.display = "none";
               
                 }).catch(this.handleError); 
     
  };
  
  

    // onRegister(eve){
    //  debugger;
    //  this.router.navigate(['register'], {queryParams: {'qdata': 200}, preserveQueryParams: true});
    // }

  dataGet(res){
    var token = res._body;
    if(token){
    let navigationExtras = {
      queryParams: { 'tokenData': token}
    };
    sessionStorage.token = token;
    sessionStorage.userName = this.userObj.username;
     this.router.navigate(['home']);
     }
  
      
}
 
  validateUser(people) {
   var userUrl = '/app/validuser' + '/' + this.userObj.username;
     this.http.get(userUrl)
                 .toPromise().then((response)=>{
                     this.dataGet(response);
                  }).catch(this.handleError); 
  };
  
  
   private handleError (error: any): Promise<any> {
      alert(error._body)
      return ;
    }
  
}