import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() cars: any[] = [];
  selectedCarName: any;
  car: any;
  SelectedCar:any;
  listOpen: boolean;
  @Output() selectedCar  = new EventEmitter(this.car);
  constructor() { }

  ngOnInit() {
  }
   onSelected(car){
    // tslint:disable-next-line:no-debugger
    debugger;
    this.car = car;
    this.selectedCar.emit(this.car);
   }

}
