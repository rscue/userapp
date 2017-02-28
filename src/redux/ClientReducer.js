import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators} = createActions({
  clientRequest: ['id'],
  clientSuccess: ['client'],
  clientFailure: ['message']
});

export const ClientTypes = Types;
export default Creators;

/* ----------- Initial State --------- */
const INITIAL_STATE = Immutable({
  isFetching: false,
  client: null,
  message: null
});

/* ------------ Reducers ---------- */
export const request = (state: Object) =>
  state.merge({ isFetching: true });

export const success = (state: Object, {client}: Object) =>
  state.merge({ isFetching: false, client });

export const failure = (state: Object, {message}: Object) =>
  state.merge({ message });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLIENT_REQUEST]: request,
  [Types.CLIENT_SUCCESS]: success,
  [Types.CLIENT_FAILURE]: failure
});
