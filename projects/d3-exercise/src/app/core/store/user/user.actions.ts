import {createAction, props} from '@ngrx/store';
import {User} from '../../../model/user.model';

export const login = createAction('[User] Login',
  props<{ payload: { email: string, password: string, 'remember-me': boolean } }>());

export const loginSuccess = createAction('[User] Login Success');

export const loginFailed = createAction('[User] Login Failed');

export const logout = createAction('[User] Logout');

export const logoutSuccess = createAction('[User] Logout Success');

export const logoutFailed = createAction('[User] Logout Failed');

export const getUserDetails = createAction('[User] Get user details');

export const getUserDetailsSuccess = createAction('[User] Get user details success',
  props<{ payload: User }>());

export const getUserDetailsFailed = createAction('[User] Get user details failed');
