import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './styles/NavigationContainerStyle';

import ProfileContainer from '../containers/ProfileContainer';

class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene initial key="profile" component={ProfileContainer} title="Perfil" navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton} />
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
