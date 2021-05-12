import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from './core/services/loading.service';
import {getUserDetails} from './core/store/user/user.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  @ViewChild('containerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private store: Store
  ) {
    this.loading$ = this.loadingService.getLoading$();
    this.store.dispatch(getUserDetails());
  }
}
