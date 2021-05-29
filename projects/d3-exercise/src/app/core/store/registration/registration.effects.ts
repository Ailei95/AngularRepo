import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {registration, registrationFailed, registrationSuccess} from './registration.actions';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationModalComponent} from '../../../pages/registration/registration-modal/registration-modal.component';
import {RegistrationService} from '../../services/registration.service';

@Injectable()
export class RegistrationEffects {

  registration$ = createEffect(() => this.actions$.pipe(
    ofType(registration),
    mergeMap((action) => this.registrationService.registration(action.payload)
      .pipe(
        tap(res => { this.dialog.open(RegistrationModalComponent, { panelClass: 'nb-dialog-wrapper', data: res }); }),
        map((res) => registrationSuccess({ payload: res })),
        catchError(() => of(registrationFailed()))
      ))
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private registrationService: RegistrationService,
    private dialog: MatDialog
  ) {
  }
}
