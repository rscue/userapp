import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../sagas';

export default () => {
  const rootReducers = combineReducers({
    auth: require('./AuthReducer').reducer
  });

  return configureStore(rootReducers, rootSaga);
};
