import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {UserState} from '../../core/store/user/user.reducer';
import {login} from '../../core/store/user/user.actions';
import {LoadingService} from '../../core/services/loading.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading$: Observable<boolean>;

  form: FormGroup;

  constructor(
    private loadingService: LoadingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<{ user: UserState }>
  ) {
    this.loading$ = this.loadingService.getLoading$();

    this.form = this.formBuilder.group({
      email: [],
      password: [],
      'remember-me': [false]
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.form.valid) {
      this.store.dispatch(login({ payload: this.form.value }));
    } else {
      if (this.form.get('email').invalid) {
        this.form.setErrors({email: true});
      }

      if (this.form.get('password').invalid) {
        this.form.setErrors({password: true});
      }
    }
  }
}
