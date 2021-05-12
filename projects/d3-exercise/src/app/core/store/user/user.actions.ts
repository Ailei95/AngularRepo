import {createAction, props} from '@ngrx/store';
import {User} from '../../../model/user.model';

export const login = createAction('[User LoginComponent] Login',
  props<{ payload: { email: string, password: string, 'remember-me': boolean } }>());

export const loginSuccess = createAction('[User LoginComponent] Login Success', props<{ payload: User }>());

export const loginFailed = createAction('[User LoginComponent] Login Failed');

export const logout = createAction('[User LoginComponent] Logout');

export const logoutSuccess = createAction('[User LoginComponent] Logout Success');

export const logoutFailed = createAction('[User LoginComponent] Logout Failed');
