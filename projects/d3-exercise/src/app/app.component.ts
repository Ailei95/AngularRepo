import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {LoadingService} from './core/services/loading.service';

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
    this.loading$ = this.loadingService.getLoading$();
  }
}
