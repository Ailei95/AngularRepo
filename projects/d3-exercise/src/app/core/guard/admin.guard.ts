import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {User} from '../../model/user.model';
import {getUser} from '../store/user/user.selectors';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  user$: Observable<User>;

  constructor(
    private store: Store,
    private userService: UserService,
    private router: Router
  ) {
    this.user$ = this.store.pipe(select(getUser));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user$.pipe(
      switchMap((user: User) => {
        return user ? of(user) : this.userService.getUser();
      }),
      map((user) => {
        if (user?.authorities?.includes('ROLE_ADMIN')) {
          return true;
        } else {
          this.router.navigate(['access-denied']).then(null);
          return false;
        }
      })
    );
  }
}
