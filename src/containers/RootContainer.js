import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import StartupActions from '../redux/StartupReducer';

class RootContainer extends Component {
  componentDidMount() {
    this.props.startup();
  }
  
  render() {
    return (
      <View>
        <Text>HOlaaaaa </Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);
