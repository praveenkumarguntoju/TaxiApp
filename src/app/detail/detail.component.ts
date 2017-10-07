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

  constructor(private actRoute: ActivatedRoute,private http: Http) {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.subscription = actRoute.params.subscribe(params => {
       this.id =  params['id'];
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

   getDetails(id) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = {'action': 'getDetail', 'data':id};
    const options = new RequestOptions({ headers: headers});
    this.http.post(`${this.API}/app`, body, options)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.driverDetails = data.driverDetail;
        this.imageUrl = data.driverDetail.picFile;
      });
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


  ngOnInit() {
    this.subscription.unsubscribe();
    this.getDetails(this.id);
  }

}
