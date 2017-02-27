/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import Styles from './styles/AppStyle';
import { Fonts } from '../themes/';

export default class MapViewContainer extends Component {
  state = {
    currentPosition: {latitude: -34.6050867, longitude: -58.3762806}
  };

  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      //let currentPosition = JSON.stringify(position);
      //console.log(position.coords);
      this.setState({ currentPosition: position.coords });
    });
    this.watchID = navigator.geolocation.watchPosition(position => {
      //let currentPosition = JSON.stringify(position);
      //console.log(position.coords);
      this.setState({ currentPosition: position.coords });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  test() {
    alert('ho');
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
        <TouchableOpacity style={styles.button} onPress={this.test}>
        <Text style={styles.buttonText}>Holaaaa</Text>
      </TouchableOpacity>
        {/*<Button onPress={this.test} style={styles.button} title="Ayuddaa" />*/}
        {/*<View style={styles.inputsContainer}>      
        <TouchableOpacity style={styles.fullWidthButton} onPress={this.test}>
        <Text>Holaaaa</Text>
      </TouchableOpacity>
      </View>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    // flex:1,
    // marginVertical: 5,
    // borderTopColor: Colors.green,
    // borderBottomColor: Colors.bloodOrange,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // backgroundColor: Colors.red
  },
  buttonText: {
    margin:5,
    textAlign: 'center',
    // color: Colors.white,
    fontSize: Fonts.size.h4,
    fontFamily: Fonts.type.normal
  }
});
