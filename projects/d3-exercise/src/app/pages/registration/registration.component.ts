import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {registration} from '../../core/store/registration/registration.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.form = this.formBuilder.group({
      'email-address': [],
      'new-password': [],
      'repeat-password': []
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid && this.form.value['new-password'] === this.form.value['repeat-password']) {
      this.store.dispatch(registration({
        payload: { email: this.form.value['email-address'], password: this.form.value['new-password']}
      }));
    } else {
      this.form.setErrors({password: true});
    }
  }
}
