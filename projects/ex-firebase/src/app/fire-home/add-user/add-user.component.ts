import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: FormGroup;

  @Output() user = new EventEmitter<User>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: [],
      surname: [],
      birthday: [],
      sex: [],
      phone: []
    });
  }

  ngOnInit(): void {
  }

  addUser(): void {
    if (this.form.valid) {
      this.user.emit(this.form.value);
      this.form.reset();
    }
  }
}
