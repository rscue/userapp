import { call, put } from 'redux-saga/effects';
import ClientActions from '../redux/ClientReducer';

export function* getClient(api, action) {
  try {
    const { id } = action;
    const response = yield call(api.getClient, id);
    if (response.ok) {
      yield put(ClientActions.clientSuccess(response.data));
    } else {
      yield put(ClientActions.clientFailure(response.problem));
    }
  } catch (error) {
    yield put(ClientActions.clientFailure('UNKNOWN_ERROR'));
  }
}
