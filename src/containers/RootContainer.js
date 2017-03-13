import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';

import ReduxPersistConfig from '../config/ReduxPersistConfig';
import StartupActions from '../redux/StartupReducer';
import styles from './styles/RootContainerStyle';

import NavigationRouter from '../navigation/NavigationRouter';

class RootContainer extends Component {
  componentDidMount() {
    if (!ReduxPersistConfig.active) {
      this.props.startup();
    }
  }

  render() {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <NavigationRouter />        
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
