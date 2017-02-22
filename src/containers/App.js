/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import Styles from './styles/AppStyle';

export default class App extends Component {
  state = {
    currentPosition: {latitude: -34.6050867, longitude: -58.3762806}
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      let currentPosition = JSON.stringify(position);
      console.log(position.coords);
      this.setState({ currentPosition: position.coords });
    });
    this.watchID = navigator.geolocation.watchPosition(position => {
      let currentPosition = JSON.stringify(position);
      console.log(position.coords);
      this.setState({ currentPosition: position.coords });
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={Styles.container} >
        <MapView style={Styles.map} showsUserLocation showsMyLocationButton followsUserLocation
          initialRegion={{
            latitude: this.state.currentPosition.latitude,
            longitude: this.state.currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/*<MapView.Marker coordinate={this.state.currentPosition} />*/}
        </MapView>
        <Button title="Ayudaaaa">Ayudaaaaa</Button>
      </View>
    );
  }
}
