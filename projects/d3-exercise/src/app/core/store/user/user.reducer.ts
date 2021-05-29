import {User} from '../../../model/user.model';
import * as UserActions from './user.actions';
import {createReducer, on} from '@ngrx/store';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state) => state),
  on(UserActions.loginFailed, (state) => state),
  on(UserActions.logoutSuccess, (state) => state),
  on(UserActions.logoutFailed, (state) => state),
  on(UserActions.getUserDetailsSuccess, (state, action) => ({ user: action.payload })),
  on(UserActions.getUserDetailsFailed, (state) => state),
  on(UserActions.setAdminSuccess, (state, action) => ({ user: action.payload })),
  on(UserActions.setAdminFailed, (state) => state)
);
