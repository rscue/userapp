import { takeLatest } from 'redux-saga/effects';

import { LoginTypes } from '../redux/LoginReducer';
import { StartupTypes } from '../redux/StartupReducer';

import { loginFlow } from './LoginSaga';
import { startupFlow } from './StartupSaga';

export default function* IndexSaga() {
  yield [
    takeLatest(StartupTypes.STARTUP, startupFlow),
    takeLatest(LoginTypes.LOGIN_REQUEST, loginFlow)
  ]
}
