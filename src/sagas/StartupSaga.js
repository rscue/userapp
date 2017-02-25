import { select } from 'redux-saga/effects';

export const selectLogin = (state) => state.login;

export function* startupFlow() {
  let login = yield select(selectLogin);
  alert(login.isFetching);
}
