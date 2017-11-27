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
declare var google:any;

@Component({
  selector: 'app-map',
  templateUrl: './usertravel.component.html',
  styleUrls: ['./usertravel.component.css']
})
export class UserTravelComponent implements OnInit {
  google:any;
  travelData:any = [];
  map:any;
  directionsService:any;
  directionsDisplay:any;

  debugger;

  locationObj = {
      lat:"",
      lng:"",
      place:"",

  }
  markers:any;
 
  private subscription: Subscription;
  ngOnInit(){
    debugger;
    this.subscription.unsubscribe();
    document.getElementById("myDiv").style.display = "block";
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 52.520, lng: 13.410 }
    });
    var marker = new google.maps.Marker({
    });
   
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(this.map);


  }
  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {

    this.subscription = actRoute.queryParamMap.subscribe(params => {
      debugger;
          //  this.token =  params.get('tokenData') || 'None'
   });
  }
  


  
  
  
}
