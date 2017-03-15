import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import configureStore from './CreateStore';
import rootSaga from '../sagas';

export default () => {
  const rootReducers = combineReducers({
    auth: require('./AuthReducer').reducer,
    client: require('./ClientReducer').reducer,
    form: formReducer
  });

  return configureStore(rootReducers, rootSaga);
};
