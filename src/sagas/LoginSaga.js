import Auth0Lock from 'react-native-lock';
import Config from 'react-native-config';
import { put, call } from 'redux-saga/effects';

import LoginActions from '../redux/LoginReducer';

const lock = new Auth0Lock({ clientId: Config.AUTH0_CLIENT_ID, domain: Config.AUTH0_DOMAIN });

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

export function* loginFlow(dispatch) {
  try {
    const login = yield call(showLogin);
    yield put(LoginActions.loginSuccess(login.profile));
  } catch (error) {
    yield put(LoginActions.loginError(error));
  }
}
