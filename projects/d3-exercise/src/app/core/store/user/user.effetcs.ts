import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFailed, loginSuccess, logout, logoutSuccess} from './user.actions';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {User} from '../../../model/user.model';
import {of} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap((action) => this.loginService.login(action.payload)
      .pipe(
        map((user: User) => loginSuccess({payload: user})),
        tap(() => this.router.navigate(['/'])),
        catchError(() => of(loginFailed()))
      ))
    )
  );

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    mergeMap(() => this.loginService.logout()
      .pipe(
        map(() => logoutSuccess()),
        catchError(() => of(loginFailed()))
      ))
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private loginService: LoginService
  ) {
  }
}
