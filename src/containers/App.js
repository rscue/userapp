/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStore } from 'redux';
import reducers from '../redux/index';
import { Provider } from 'react-redux';

const store = createStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <View>
          <Text>HOlaaaaa </Text>
        </View>
      </Provider>
    );
  }
}
