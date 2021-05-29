import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {UserService} from '../../core/services/user.service';
import {select, Store} from '@ngrx/store';
import {getUser} from '../../core/store/user/user.selectors';
import {getUserDetails} from '../../core/store/user/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private store: Store
  ) {
    this.user$ = this.store.pipe(select(getUser));
    this.store.dispatch(getUserDetails());
  }

  ngOnInit(): void {
  }

}
