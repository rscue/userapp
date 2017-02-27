import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate } from 'redux-persist';

import RehydrationServices from '../services/RehydrationServices';
import ReduxPersistConfig from '../config/ReduxPersistConfig';

export default (rootReducer, rootSaga) => {
  const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  enhancers.push(applyMiddleware(sagaMiddleware));

  if (ReduxPersistConfig.active) {
    enhancers.push(autoRehydrate());
  }

  const store = createStore(rootReducer, compose(...enhancers));

  if (ReduxPersistConfig.active) {
    RehydrationServices.updateReducers(store);
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
