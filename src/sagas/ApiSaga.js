import { select } from 'redux-saga/effects';

export const selectIdToken = (state) => state.auth.apiIdToken;

export function* setAuthHeader(api) {
  const idToken = yield select(selectIdToken);
  api.setAuthHeader(`Bearer ${idToken}`);
}
