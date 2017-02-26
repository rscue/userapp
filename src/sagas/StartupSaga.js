import { select, put } from 'redux-saga/effects';

import AuthActions from '../redux/AuthReducer';

export const selectUserAuthenticated = (state) => state.auth.isAuthenticated;

export function* startupFlow() {
  let isAuthenticated = yield select(selectUserAuthenticated);
  if (!isAuthenticated) {
    yield put(AuthActions.loginRequest());
  } else {
    yield put(AuthActions.refreshIdTokenRequest());
  }
}
