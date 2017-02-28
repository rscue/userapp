import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { autoRehydrate } from 'redux-persist';
import createLogger from 'redux-logger';
import R from 'ramda';

import RehydrationServices from '../services/RehydrationServices';
import ReduxPersistConfig from '../config/ReduxPersistConfig';
import Config from '../config/DebugSettings';


export default (rootReducer, rootSaga) => {
  const enhancers = [];

  const sagaMonitor = __DEV__ ? window.tron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  enhancers.push(applyMiddleware(sagaMiddleware));

  /* ------------- Logger Middleware ------------- */

  const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'];
  if (__DEV__) {
    // the logger master switch
    const USE_LOGGING = Config.reduxLogging;
    // silence these saga-based messages
    // create the logger
    const logger = createLogger({
      predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
    });
    enhancers.push(applyMiddleware(logger));
  }


  if (ReduxPersistConfig.active) {
    enhancers.push(autoRehydrate());
  }

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? window.tron.createStore : createStore;
  const store = createAppropriateStore(rootReducer, compose(...enhancers));

  if (ReduxPersistConfig.active) {
    RehydrationServices.updateReducers(store);
  }

  sagaMiddleware.run(rootSaga);

  return store;
};
