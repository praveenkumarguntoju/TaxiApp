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
  infowindow:any;
  markerz = {};
  self=this;

  debugger;

  locationObj = {
      lat:"",
      lng:"",
      place:"",
      text:"",
      visitedDate:"",
      tourname:""
}
  markers:any = [];
 
  private subscription: Subscription;
  ngOnInit(){
    debugger;
    this.subscription.unsubscribe();
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 52.520, lng: 13.410 }
    });
    var marker = new google.maps.Marker({
    });
    this.infowindow = new google.maps.InfoWindow({
      
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
  
    this.directionsDisplay.setMap(this.map);

    
    this.map.addListener('click', this.addLatLng);
   
  

}
  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {

    this.subscription = actRoute.queryParamMap.subscribe(params => {
      debugger;
          //  this.token =  params.get('tokenData') || 'None'
   });
  }


  infowindowSet = (map,marker)=>{
    debugger;
    var dataObj;
    var geocoder = new google.maps.Geocoder;
    var pos = marker.getPosition();
    var index = this.travelData.indexOf({ lat: pos.lat() });
    if (dataObj) {
      var contentString = '<div id="content" style="width:100%;height:100%;">' +
        '<div id="siteNotice" style="float:left;width: 45%; overflow:hidden;padding:2px;">' +
        '<span style="font-size:19px;"><b>' + dataObj.place + '</b></span>' +
        '<div class="imagePattern" style="background: url(' + dataObj.image + ') no-repeat center center; height: 200px;width: 250px;"></div>' +
        '</div>' +

        '<div id="viewContent" style="overflow-y: auto;width: 50%;height: 174px; float:left;padding:2px;">' +
        '<span style="font-size:19px;"><b>Comments</b></span>' +
        '<p>' + dataObj.text + '</p>' +
        '(last visited' + dataObj.visitedDate + ')' + '</b>' + '.</p>' +
        '</div>' +
        '</div>';
    } else {
      debugger;
      this.locationObj.lat = pos.lat();
      this.locationObj.lng = pos.lng();
      let locName = new google.maps.LatLng({lat: this.locationObj.lat, lng: this.locationObj.lng});
      geocoder.geocode({'location': locName}, function(results, status) {
           if (status === 'OK') {
                    if (results[0]) {
                      debugger;
                      this.locationObj.place = results[0].formatted_address;
                  } else {
                      window.alert('No results found');
                        }
            } else {
              window.alert('Geocoder failed due to: ' + status);
             }
           }.bind(this));



      var contentString = '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Create Location</button>';
  }
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

   addLatLng = (event) => {
    debugger;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var id = Math.floor(Math.random() * chars.length);
   // var tourName = document.getElementById('tourName').value;
    var marker = new google.maps.Marker({
      tourname: "New Tour",
      id: id,
      position: event.latLng,
      title: '#' + id,
      map: this.map
    });


    this.markers.push(marker);
    this.markerz[id] = marker;
    // google.maps.event.addListener(marker, "rightclick", function (point) {
    //   debugger;
    //   delMarker(id)
    // });
    marker.addListener('click', function () {
      this.infowindowSet(this.map, marker);
    }.bind(this));
  }; 


  saveLocation() {
    debugger;
    var geocoder = new google.maps.Geocoder;
    var date = new Date();
    this.locationObj.text = "3fh3foih3foih43if3fih43";
    this.locationObj.visitedDate = "11/28/2017";
    this.locationObj.tourname = "TestTour"
    debugger;

    var saveObj = this.locationObj;
    this.travelData.push(saveObj);
  }



  
}
