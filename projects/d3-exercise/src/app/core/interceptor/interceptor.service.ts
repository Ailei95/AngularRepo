import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {LoadingService} from './loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService,
    private matSnackBar: MatSnackBar
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.increment();
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.matSnackBar.open(error.status + ' ' + error.statusText, 'OK',
          { duration: 5000, panelClass: ['mat-error-snackbar', 'shadow-md'] });
        return throwError(error);
      }),
      finalize(() => { this.loadingService.decrement(); })
    );
  }
}
