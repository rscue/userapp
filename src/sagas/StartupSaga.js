import { select, put } from 'redux-saga/effects';

import LoginActions from '../redux/LoginReducer';

export const selectUserAuthenticated = (state) => state.login.isAuthenticated;

export function* startupFlow() {
  let isAuthenticated = yield select(selectUserAuthenticated);
  if (!isAuthenticated) {
    yield put(LoginActions.loginRequest());
  }
  //alert(login.profile);
}
