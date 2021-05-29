import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainModule} from './pages/main/main.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => MainModule
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'access-denied',
    loadChildren: () => import('./pages/access-denied/access-denied.module').then(m => m.AccessDeniedModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
