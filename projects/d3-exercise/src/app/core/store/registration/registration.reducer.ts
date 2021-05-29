import {createReducer, on} from '@ngrx/store';
import * as RegistrationActions from '../registration/registration.actions';
import {Confirmation} from '../../../model/confirmation.model';

export interface RegistrationState {
  confirmation: Confirmation;
}

export const initialState: RegistrationState = {
  confirmation: null
};

export const registrationReducer = createReducer(
  initialState,
  on(RegistrationActions.registrationSuccess, (state, action) => ({ confirmation: action.payload })),
  on(RegistrationActions.registrationFailed, (state) => state)
);
