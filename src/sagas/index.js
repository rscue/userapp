import { takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../redux/AuthReducer';
import { StartupTypes } from '../redux/StartupReducer';

import { authFlow, authRefreshIdTokenFlow } from './AuthSaga';
import { startupFlow } from './StartupSaga';

export default function* IndexSaga() {
  yield [
    takeLatest(StartupTypes.STARTUP, startupFlow),
    takeLatest([AuthTypes.LOGIN_REQUEST, AuthTypes.LOGOUT_REQUEST], authFlow),
    takeLatest(AuthTypes.REFRESH_ID_TOKEN_REQUEST, authRefreshIdTokenFlow)
  ];
}
