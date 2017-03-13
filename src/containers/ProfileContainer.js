import React, { Component } from 'react';
import { Picker } from 'react-native';
import Content from '../components/ContentComponent';
import FloatLabelTextInput from '../components/FloatLabelTextInput';
import FloatLabelPicker from '../components/FloatLabelPicker';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleType: null
    };
  }

  render() {
    return (
      <Content>
        <FloatLabelTextInput ref='nameInput' returnKeyType='next'
          onSubmitEditing={() => this.refs.lastNameInput.focus()}>Nombre</FloatLabelTextInput>
        <FloatLabelTextInput ref='lastNameInput' returnKeyType='next' >Apellido</FloatLabelTextInput>
        <FloatLabelPicker placeholder='Tipo de vehículo' selectedValue={this.state.vehicleType} mode='dropdown'
          onValueChange={(value) => this.setState({ vehicleType: value })}>
          <Picker.Item label="Moto de agua" value="WaterBike" />
          <Picker.Item label="Yate" value="Yacht" />
        </FloatLabelPicker>
      </Content >
    );
  }
}

export default ProfileContainer;
