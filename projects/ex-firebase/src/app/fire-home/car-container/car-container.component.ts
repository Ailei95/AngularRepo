import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../models/car.model';

@Component({
  selector: 'app-car-container',
  templateUrl: './car-container.component.html',
  styleUrls: ['./car-container.component.css']
})
export class CarContainerComponent implements OnInit {

  @Input() car: Car;

  constructor() {
  }

  ngOnInit(): void {
  }

}
