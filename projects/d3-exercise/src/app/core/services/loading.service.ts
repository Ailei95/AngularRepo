import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private queue: number;

  private readonly loading$: BehaviorSubject<boolean>;

  constructor(
    private router: Router
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
      }
    });

    this.queue = 0;
    this.loading$ = new BehaviorSubject(false);
  }

  increment(): void {
    this.queue++;
    this.loading$.next(true);
    console.log(this.queue);
  }

  decrement(): void {
    if (--this.queue <= 0) {
      this.loading$.next(false);
    }
    console.log(this.queue);
  }

  getLoading$(): Observable<boolean> {
    return this.loading$;
  }
}
