import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LoadingService} from './core/interceptor/loading.service';
import {delay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @ViewChild('containerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.getLoading$().pipe(
      switchMap((loading) => {
        return loading ? of(loading).pipe(delay(100)) : of(loading);
      })
    );
  }
}
