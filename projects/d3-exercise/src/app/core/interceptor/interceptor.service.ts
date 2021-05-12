import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {LoadingService} from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadingService.increment();

    return next.handle(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          if (res.body && res.body.success) {
            this.loadingService.decrement();
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        this.loadingService.decrement();
        return throwError(error);
      })
    );
  }
}
