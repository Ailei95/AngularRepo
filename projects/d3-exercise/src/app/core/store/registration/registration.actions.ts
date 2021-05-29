import {createAction, props} from '@ngrx/store';
import {Registration} from '../../../model/registration.model';
import {Confirmation} from '../../../model/confirmation.model';

export const registration = createAction('[User] Registration',
  props<{ payload: Registration }>());

export const registrationSuccess = createAction('[User] Registration Success',
  props<{ payload: Confirmation }>());

export const registrationFailed = createAction('[User] Registration Failed');
