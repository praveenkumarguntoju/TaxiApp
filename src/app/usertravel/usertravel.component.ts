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
declare var jQuery:any;

@Component({
  selector: 'app-map',
  templateUrl: './usertravel.component.html',
  styleUrls: ['./usertravel.component.css']
})
export class UserTravelComponent implements OnInit {
  google:any;
  travelData:any = [];
  lat:any;
  lng:any;
  map:any;
  directionsService:any;
  directionsDisplay:any;
  infowindow:any;
  markerz = {};
  self=this;
  navigator:any;
  jQuery:any;

  debugger;

  locationObj = {
      user:"",
      id:"",
      lat:"",
      lng:"",
      place:"",
      text:"",
      visitedDate:"",
      tourname:"",
      image:""
}
  markers:any = [];
 
  private subscription: Subscription;
  ngOnInit(){
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    debugger;
    this.subscription.unsubscribe();
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: { lat: this.lat, lng: this.lng }
        });
      this.directionsDisplay.setMap(this.map);
      }.bind(this), function() {
         debugger;
      });
    } 
  
    var marker = new google.maps.Marker({
    });
    this.infowindow = new google.maps.InfoWindow({
     });
}
  constructor(private actRoute: ActivatedRoute,private http: Http, private router: Router) {

    this.subscription = actRoute.queryParamMap.subscribe(params => {
      debugger;
          //  this.token =  params.get('tokenData') || 'None'
   });
  }

  //adding location
  addLocation(){
    debugger;
    let geocoder = new google.maps.Geocoder;
    var marker;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    var id = Math.floor(Math.random() * chars.length);
    var data = document.getElementById("myModal");
    if(jQuery){
      jQuery(data).modal();
    }
   
    if (navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
          marker = new google.maps.Marker({
          tourname: "New Tour",
          id: id,
          position: new google.maps.LatLng( this.lat,this.lng),
          title: '#' + id,
          map: this.map
        });
        marker.addListener('click', function () {
          this.infowindowSet(this.map, marker);
        }.bind(this));
      }.bind(this), function() {
         debugger;
      });
    };
    this.locationObj.id = id.toString();
    this.locationObj.lat = this.lat;
    this.locationObj.lng = this.lng;
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
      
    }








  infowindowSet = (map,marker)=>{
    debugger;
    var dataObj;
    var geocoder = new google.maps.Geocoder;
    var pos = marker.getPosition();
    var finddataObj = function(ele){
      return ele.id == marker.id;
    }
   dataObj =  this.travelData.find(finddataObj);
    if (dataObj) {
      var contentString = '<div id="content" style="width:100%;height:100%;">' +
        '<div id="siteNotice" style="float:left;width: 45%; overflow:hidden;padding:2px;">' +
        '<span style="font-size:19px;"><b>' + dataObj.place + '</b></span>' +
        '<img src= '+ dataObj.image +' class="imagePattern" style="no-repeat center center; height: 200px;width: 250px;">' +
        '</div>' +

        '<div id="viewContent" style="overflow-y: auto;width: 50%;height: 174px; float:left;padding:2px;">' +
        '<span style="font-size:19px;"><b>Comments</b></span>' +
        '<p>' + dataObj.text + '</p>' +
        '(last visited' + dataObj.visitedDate + ')' + '</b>' + '.</p>' +
        '</div>' +
        '</div>';
    } 
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

   addLatLng = (event) => {
  //   debugger;
  //   var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
  //   var id = Math.floor(Math.random() * chars.length);
  //  // var tourName = document.getElementById('tourName').value;
  //   var marker = new google.maps.Marker({
  //     tourname: "New Tour",
  //     id: id,
  //     position: event.latLng,
  //     title: '#' + id,
  //     map: this.map
  //   });

   

  //   this.markers.push(marker);
  //   this.markerz[id] = marker;
  //   // google.maps.event.addListener(marker, "rightclick", function (point) {
  //   //   debugger;
  //   //   delMarker(id)
  //   // });
  //   marker.addListener('click', function () {
  //     this.infowindowSet(this.map, marker);
  //   }.bind(this));
  }; 


  saveLocation() {
    debugger;
    var geocoder = new google.maps.Geocoder;
    var date = new Date();
    this.locationObj.visitedDate = date.toString();
    this.locationObj.tourname = "TestTour";
    this.locationObj.user = sessionStorage.userName;
    debugger;

    var saveObj = JSON.parse(JSON.stringify(this.locationObj))
    this.travelData.push(saveObj);

    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
    const body = {'action': 'create', 'data': this.travelData};
    const options = new RequestOptions({ headers: header});
    
    this.http.post('/app/usermapdata',saveObj,{headers: header})
              .toPromise()
              .then((response)=>{
                 debugger;
              alert("location was successfully created..");
              document.getElementById("myDiv").style.display = "none";
              }).catch(this.handleError); 
  }

dataGet(res){
  var position;
    var mapData = JSON.parse(res._body);
    if(mapData.data)
    this.travelData = mapData.data;
     for (var i = 0; i < this.travelData.length; i++) {
     position = new google.maps.LatLng( this.travelData[i].lat,this.travelData[i].lng);
      this.addMarkerWithTimeout(position, i * 200,this.travelData[i].id);
    }
  }


  //upload image
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
    this.locationObj.image = oc.toDataURL('image/jpeg');
    
   }.bind(this);
   img.src = URL.createObjectURL(file[0]);
   if (file.length > 0) {
//           this.getBase64(file[0]);
       }
   };


  // end

drop() {
    // clearMarkers();
    debugger;
    // var travelObj = _.groupBy(this.travelData, "tourname");
    // var value = "SampleTour";
    var id = "praveen"
    // neighborhoods = travelObj[value];
    const header = new Headers({ 'Content-Type': 'application/json','x-access-token': sessionStorage.token });
    const body = {'action': 'getData'};
    const options = new RequestOptions({ headers: header});
    var contactsUrl = '/app/usergetmapdata' + '/' + id;
    this.http.get(contactsUrl,{ headers: header })
    .toPromise()
    .then((response)=>{
       debugger;
       this.dataGet(response);
    }).catch(this.handleError);
    // calculateAndDisplayRoute(neighborhoods);
}


 addMarkerWithTimeout(position, timeout,id) {
  window.setTimeout(function () {

    var marker = new google.maps.Marker({
      position: position,
      id: id,
      map: this.map,
      animation: google.maps.Animation.DROP
    });
    this.markers.push(marker);
    marker.addListener('click', function () {
      this.infowindowSet(this.map, marker)
    }.bind(this));
  }.bind(this), timeout);
}










  private handleError (error: any): Promise<any> {
    debugger;
   let errMsg = (error.message) ? error.message :
   error.status ? `${error.status} - ${error.statusText}` : 'Server error';
   console.error(errMsg); // log to console
   return Promise.reject(errMsg);
 };




  
}
