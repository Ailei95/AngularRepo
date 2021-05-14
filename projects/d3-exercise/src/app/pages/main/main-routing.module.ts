import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AdminGuard} from '../../core/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        pathMatch: 'full'
      },
      {
        path: 'barchart',
        loadChildren: () => import('./barchart/barchart.module').then(m => m.BarchartModule)
      },
      {
        path: 'statistics',
        loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'private',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
