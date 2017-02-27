import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar, Button } from 'react-native';

import ReduxPersistConfig from '../config/ReduxPersistConfig';
import StartupActions from '../redux/StartupReducer';
import AuthActions from '../redux/AuthReducer';

class RootContainer extends Component {
  componentDidMount() {
    if (!ReduxPersistConfig.active) {
      this.props.startup();
    }
  }

  render() {
    return (
      <View>
        <StatusBar barStyle='light-content' />
        <Text>{this.props.profile ? this.props.profile.userId : 'vacio id'} </Text>
        <Text>{this.props.isAuthenticated.toString()}</Text>
        <Text>{this.props.token} hh</Text>
        <Button title="Cerrar sesión" onPress={this.props.logout} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.auth.profile,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.refreshToken
  };
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
  logout: () => dispatch(AuthActions.logoutRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
