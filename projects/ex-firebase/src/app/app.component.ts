import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {from} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public auth: AngularFireAuth
  ) {
  }

  login(): void {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(null);
    from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).subscribe(console.log, alert);
  }

  logout(): void {
    this.auth.signOut().then(null);
  }
}
