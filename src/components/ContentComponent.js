import React, { Component } from 'react';
import { View } from 'react-native';
import Styles from './styles/ContentComponentStyle';

export default class ContentComponent extends Component {
  render() {
    return (
      <View style={Styles}>
        {this.props.children}
      </View>
    );
  }
}
