import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import jwtDecode from 'jwt-decode';

import AuthActions from '../redux/AuthReducer';
import StartupActions from '../redux/StartupReducer';

const lock = new Auth0Lock({ clientId: Config.AUTH0_CLIENT_ID, domain: Config.AUTH0_DOMAIN });
const selectIdToken = state => state.auth.apiIdToken;
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
    yield put(AuthActions.loginSuccess(login.profile, login.token.refreshToken));
    yield put(AuthActions.refreshIdTokenRequest());
  } catch (error) {
    alert(error);
  }
}

function* authGetIdTokenExpiration() {
  let idToken = yield select(selectIdToken);
  if (idToken) {
    let expirationDate = new Date(jwtDecode(idToken).exp * 1000);
    let diffTime = expirationDate.getTime() - (new Date().getTime());
    return diffTime;
  }
  return null;
}

export function* authRefreshIdTokenFlow() {
  try {
    const authenticationAPI = lock.authenticationAPI();
    while (true) {
      const diffTime = yield call(authGetIdTokenExpiration);
      yield delay(diffTime);
      const refreshToken = yield select(selectRefreshToken);
      const options = {
        target: Config.AUTH0_API_CLIENT_ID,
        scope: 'openid',
        refreshToken
      };
      const token = yield call([authenticationAPI, authenticationAPI.delegation], options);
      if (token.id_token) {
        yield put(AuthActions.refreshIdTokenSuccess(token.id_token));
      } else {
        yield put(AuthActions.logoutRequest());
      }
    }
  } catch (error) {
    yield put(AuthActions.logoutRequest());
  }
}

export function* logoutFlow() {
  yield put(StartupActions.startup());
}
