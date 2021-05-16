import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class LoadingService {

  private queue: number;

  private readonly loading$: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {

    router.events.pipe(
      filter((event) => event instanceof RouterEvent)
    ).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.increment();
      } else if (event instanceof NavigationEnd) {
        this.decrement();
      }  else if (event instanceof NavigationCancel) {
        this.decrement();
      } else if (event instanceof NavigationError) {
        this.matSnackBar.open((event as NavigationError).error.name, 'OK',
          { duration: 5000, panelClass: ['mat-error-snackbar', 'shadow-md'] });
        this.decrement();
      }
    });

    this.queue = 0;
    this.loading$ = new BehaviorSubject(false);
  }

  increment(): void {
    this.queue++;
    this.loading$.next(true);
  }

  decrement(): void {
    if (--this.queue <= 0) {
      this.loading$.next(false);
    }
  }

  getLoading$(): Observable<boolean> {
    return this.loading$;
  }
}
