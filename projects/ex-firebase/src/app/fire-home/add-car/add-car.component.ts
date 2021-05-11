import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Car} from '../../models/car.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  form: FormGroup;

  @Output() car = new EventEmitter<Car>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      class: [],
      model: [],
      plate: [],
      displacement: []
    });
  }

  ngOnInit(): void {
  }

  addCar(): void {
    if (this.form.valid) {
      this.car.emit(this.form.value);
      this.form.reset();
    }
  }
}
