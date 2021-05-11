import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fire',
    pathMatch: 'full'
  },
  {
    path: 'fire',
    loadChildren: () => import('./fire-home/fire-home.module').then(m => m.FireHomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
