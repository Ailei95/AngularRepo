import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {

    this.form = this.formBuilder.group({
      email: [],
      password: [],
      'remember-me': [false]
    });
  }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
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
