import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.reducer';

export const getUserState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(
  getUserState,
  (state: UserState) => state.user
);
