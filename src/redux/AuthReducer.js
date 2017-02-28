import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: null,
  loginSuccess: ['profile', 'refreshToken', 'idToken'],
  refreshIdTokenRequest: null,
  refreshIdTokenSuccess: ['apiIdToken'],
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
  apiIdToken: null
});

/* ------------- Reducers ------------- */
export const request = (state: Object) =>
  state.merge({ isFetching: true });

export const success = (state: Object, {profile, refreshToken}: Object) =>
  state.merge({ isFetching: false, isAuthenticated: true, profile, refreshToken });

export const logout = () => INITIAL_STATE;

export const refreshApiIdToken = (state: Object, {apiIdToken}: Object) =>
  state.merge({ apiIdToken, isFetching: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.REFRESH_ID_TOKEN_REQUEST]: request,
  [Types.REFRESH_ID_TOKEN_SUCCESS]: refreshApiIdToken,
  [Types.LOGOUT_REQUEST]: logout
});

