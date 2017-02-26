import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from '../redux/index';

import RootContainer from './RootContainer';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <RootContainer />
      </Provider>
    );
  }


}
