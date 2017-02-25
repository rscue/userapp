import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'  

import IndexReducers from '../redux/index';
import IndexSagas from '../sagas/index';

import RootContainer from './RootContainer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(IndexReducers, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(IndexSagas);

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <RootContainer/>
      </Provider>
    );
  }

  
}
