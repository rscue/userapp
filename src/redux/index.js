import { combineReducers } from 'redux';

const IndexReducers = combineReducers({
  login: require('./LoginReducer').reducer
});

export default IndexReducers;
