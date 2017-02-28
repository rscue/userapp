import { takeLatest } from 'redux-saga/effects';

import { AuthTypes } from '../redux/AuthReducer';
import { StartupTypes } from '../redux/StartupReducer';
import { ClientTypes } from '../redux/ClientReducer';
import { ApiTypes } from '../redux/ApiReducer';

import { authFlow, authRefreshIdTokenFlow, logoutFlow } from './AuthSaga';
import { startupFlow } from './StartupSaga';
import { getClient } from './ClientSaga';
import { setAuthHeader } from './ApiSaga';
import api from '../services/RscueApiService';

export default function* IndexSaga() {
  yield [
    takeLatest(StartupTypes.STARTUP, startupFlow),
    takeLatest(AuthTypes.LOGIN_REQUEST, authFlow),
    takeLatest(AuthTypes.REFRESH_ID_TOKEN_REQUEST, authRefreshIdTokenFlow, api),
    takeLatest(ApiTypes.SET_AUTH_HEADER, setAuthHeader, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logoutFlow),
    takeLatest(ClientTypes.CLIENT_REQUEST, getClient, api)
  ];
}
