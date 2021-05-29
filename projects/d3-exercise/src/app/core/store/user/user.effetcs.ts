import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  getUserDetails,
  getUserDetailsFailed,
  getUserDetailsSuccess,
  login,
  loginFailed,
  loginSuccess,
  logout,
  logoutSuccess, setAdmin, setAdminFailed, setAdminSuccess
} from './user.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Store} from '@ngrx/store';

@Injectable()
export class UserEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((action) => this.loginService.login(action.payload)
      .pipe(
        tap(() => {
          this.router.navigate(['/']).then(null);
          this.store.dispatch(getUserDetails());
        }),
        map(() => loginSuccess()),
        catchError(() => of(loginFailed()))
      ))
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap(() => this.loginService.logout()
      .pipe(
        tap(() => this.store.dispatch(getUserDetails())),
        map(() => logoutSuccess()),
        catchError(() => of(loginFailed()))
      ))
    )
  );

  user$ = createEffect(() => this.actions$.pipe(
    ofType(getUserDetails),
    mergeMap(() => this.userService.getUser()
      .pipe(
        map((res) => getUserDetailsSuccess({ payload: res })),
        catchError(() => of(getUserDetailsFailed()))
      ))
    )
  );

  updated$ = createEffect(() => this.actions$.pipe(
    ofType(setAdmin),
    mergeMap((action) => this.userService.setAdmin(action.payload)
      .pipe(
        map((res) => setAdminSuccess({ payload: res })),
        catchError(() => of(setAdminFailed()))
      ))
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private loginService: LoginService,
    private userService: UserService,
    private store: Store
  ) {
  }
}
