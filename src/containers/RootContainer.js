import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar } from 'react-native';
import StartupActions from '../redux/StartupReducer';
import ReduxPersistConfig from '../config/ReduxPersistConfig';

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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.login.profile,
    isAuthenticated: state.login.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
