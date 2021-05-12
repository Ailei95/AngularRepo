import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {User} from '../../model/user.model';
import {UserState} from '../store/user/user.reducer';
import {getUser} from '../store/user/user.selectors';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {

  user$: Observable<User>;

  constructor(
    private store: Store<{ user: UserState }>,
    private router: Router
  ) {
    this.user$ = this.store.pipe(select(getUser));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(map((user) => {
      if (user?.authorities?.includes('ROLE_ADMIN')) {
        return true;
      } else {
        this.router.navigate(['access-denied']).then(null);
        return false;
      }
    }));
  }
}
