import {combineReducers} from 'redux';

const reducers = combineReducers({
  login: require('./LoginReducer').reducer
});

export default reducers;
