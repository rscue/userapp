import { select, put } from 'redux-saga/effects';

import AuthActions from '../redux/AuthReducer';
import ClientActions from '../redux/ClientReducer';
import ApiActions from '../redux/ApiReducer';

export const selectUserAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.profile.userId;
export const selectIdToken = (state) => state.auth.idToken;

export function* startupFlow() {
  const isAuthenticated = yield select(selectUserAuthenticated);
  if (!isAuthenticated) {
    yield put(AuthActions.loginRequest());
  } else {
    yield put(AuthActions.refreshIdTokenRequest());
    yield put(ApiActions.setAuthHeader());
    const userId = yield select(selectUserId);
    yield put(ClientActions.clientRequest(userId));

  }
}
