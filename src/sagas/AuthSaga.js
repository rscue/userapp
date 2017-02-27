import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import jwtDecode from 'jwt-decode';

import AuthActions from '../redux/AuthReducer';

const lock = new Auth0Lock({ clientId: Config.AUTH0_CLIENT_ID, domain: Config.AUTH0_DOMAIN });
const selectIdToken = state => state.auth.idToken;
const selectRefreshToken = state => state.auth.refreshToken;

function showLogin() {
  return new Promise((resolve, error) => {
    lock.show({ connections: ['sms'] }, (err, profile, token) => {
      if (err) {
        error(err);
      } else {
        resolve({ profile, token });
      }
    });
  });
}

export function* authFlow() {
  try {
    const login = yield call(showLogin);
    yield put(AuthActions.loginSuccess(login.profile, login.token.refreshToken, login.token.idToken));
    yield put(AuthActions.refreshIdTokenRequest());
  } catch (error) {
    alert(error);
  }
}

function* authGetIdTokenExpiration() {
  let idToken = yield select(selectIdToken);
  let expirationDate = new Date(jwtDecode(idToken).exp * 1000);
  let diffTime = expirationDate.getTime() - (new Date().getTime());
  return diffTime;
}

export function* authRefreshIdTokenFlow() {
  try {
    const authenticationAPI = lock.authenticationAPI();
    while (true) {
      let diffTime = yield call(authGetIdTokenExpiration);
      yield delay(diffTime);
      let refreshToken = yield select(selectRefreshToken);
      let token = yield call([authenticationAPI, authenticationAPI.refreshToken], refreshToken);
      if (token.idToken) {
        yield put(AuthActions.refreshIdTokenSuccess(token.idToken));
      } else {
        yield put(AuthActions.logoutRequest());
      }
    }
  } catch (error) {
    yield put(AuthActions.logoutRequest());
  }
}
