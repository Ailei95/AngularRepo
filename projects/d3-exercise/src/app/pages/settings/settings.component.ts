import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {select, Store} from '@ngrx/store';
import {setAdmin, getUserDetails} from '../../core/store/user/user.actions';
import {getUser} from '../../core/store/user/user.selectors';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

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

  updateRole(isAdmin: boolean): void {
    this.store.dispatch(setAdmin({ payload: isAdmin }));
  }
}
