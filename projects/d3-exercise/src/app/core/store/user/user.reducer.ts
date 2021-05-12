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
  on(UserActions.loginSuccess, (state, action) => ({ user: action.payload })),
  on(UserActions.loginFailed, (state) => state),
  on(UserActions.logoutSuccess, () => ({ user: null })),
  on(UserActions.logoutFailed, (state) => state),
);
