import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FireHomeRoutingModule} from './fire-home-routing.module';
import {FireHomeComponent} from './fire-home.component';
import {AddUserComponent} from './add-user/add-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserContainerComponent } from './user-container/user-container.component';
import { CarContainerComponent } from './car-container/car-container.component';
import { AddCarComponent } from './add-car/add-car.component';

@NgModule({
  declarations: [
    FireHomeComponent,
    AddUserComponent,
    UserContainerComponent,
    CarContainerComponent,
    AddCarComponent
  ],
  imports: [
    CommonModule,
    FireHomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FireHomeModule {
}
