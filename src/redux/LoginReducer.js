import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  loginRequest: ['creds'],
  loginSuccess: ['user'],
  loginError: ['message']
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
const INITIAL_STATE = Immutable({
  isFetching: false,
  isAuthenticated: false,
  message: null
});

/* ------------- Reducers ------------- */
export const request = (state: Object, {creds}: Object) =>
  state.merge({ isFetching: true, isAuthenticated: false, user: creds, message: null });

export const success = (state: Object) =>
  state.merge({ isFetching: false, isAuthenticated: true, message: null });

export const failure = (state: Object, {message}: Object) =>
  state.merge({ isFetching: false, isAuthenticated: false, message });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_ERROR]: failure
});
