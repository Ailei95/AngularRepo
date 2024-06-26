import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, timeout} from 'rxjs/operators';
import {LoadingService} from './loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {getUserDetails} from '../store/user/user.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private store: Store
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.increment();
    return next.handle(req).pipe(
      timeout(20000),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) { this.router.navigate(['/']).then(() => this.store.dispatch(getUserDetails())); }

        this.matSnackBar.open(error.status + ' ' + error.error?.message, 'OK',
          { duration: 5000, panelClass: ['mat-error-snackbar', 'shadow-md'] });
        return throwError(error);
      }),
      finalize(() => { this.loadingService.decrement(); })
    );
  }
}
