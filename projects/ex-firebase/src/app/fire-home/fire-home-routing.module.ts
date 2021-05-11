import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireHomeComponent } from './fire-home.component';

const routes: Routes = [{ path: '', component: FireHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FireHomeRoutingModule { }
