import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../sagas';

export default () => {
  const rootReducers = combineReducers({
    login: require('./LoginReducer').reducer
  });

  return configureStore(rootReducers, rootSaga);
}
