import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegistrationRoutingModule} from './registration-routing.module';
import {RegistrationComponent} from './registration.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {RegistrationModalComponent} from './registration-modal/registration-modal.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {registrationReducer} from '../../core/store/registration/registration.reducer';
import {RegistrationEffects} from '../../core/store/registration/registration.effects';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationModalComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    StoreModule.forFeature('registrationState', registrationReducer),
    EffectsModule.forFeature([RegistrationEffects]),
    MatTooltipModule
  ]
})
export class RegistrationModule {
}
