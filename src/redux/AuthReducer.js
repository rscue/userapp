import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: ['profile', 'refreshToken', 'idToken'],
  refreshIdTokenRequest: null,
  refreshIdTokenSuccess: ['idToken'],
  logoutRequest: null
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  isFetching: false,
  isAuthenticated: false,
  profile: null,
  refreshToken: null,
  idToken: null
});

/* ------------- Reducers ------------- */
export const request = (state: Object) =>
  state.merge({ isFetching: true });

export const success = (state: Object, {profile, refreshToken, idToken}: Object) =>
  state.merge({ isFetching: false, isAuthenticated: true, profile, refreshToken, idToken });

export const logout = (state: Object) => INITIAL_STATE;

export const refreshIdToken = (state: Object, {idToken}: Object) =>
  state.merge({ idToken, isFetching: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.REFRESH_ID_TOKEN_REQUEST]: request,
  [Types.REFRESH_ID_TOKEN_SUCCESS]: refreshIdToken,
  [Types.LOGOUT_REQUEST]: logout
});

