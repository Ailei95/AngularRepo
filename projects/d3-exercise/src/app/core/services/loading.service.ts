import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private queue: number;

  private readonly loading$: BehaviorSubject<boolean>;

  constructor() {
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
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }
}
