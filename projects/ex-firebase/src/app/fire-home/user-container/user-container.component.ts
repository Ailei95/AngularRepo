import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../../models/user.model';
import {Car} from '../../models/car.model';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  @Input() user: User;
  @Output() car = new EventEmitter<Car>();

  trackById = (index: number, element: Car): string => element.id;

  constructor() { }

  ngOnInit(): void {
  }

  deleteCar(car: Car): void {
    this.car.emit(car);
  }
}
