import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, FormGroup} from '@angular/forms';
import {from} from 'rxjs';

@Component({
  selector: 'app-fire-logig',
  templateUrl: './fire-logig.component.html',
  styleUrls: ['./fire-logig.component.css']
})
export class FireLogigComponent implements OnInit {

  form: FormGroup;

  constructor(
    public auth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: [],
      password: []
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    from(this.auth.signInWithEmailAndPassword(this.form.get('email').value, this.form.get('password').value)).subscribe(console.log, alert);
  }
}
