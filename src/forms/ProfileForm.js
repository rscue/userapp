import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, Picker, ScrollView, Image } from 'react-native';
import Button from 'apsl-react-native-button';
import FloatLabelTextInput from '../components/FloatLabelTextInput';
import FloatLabelPicker from '../components/FloatLabelPicker';
import Content from '../components/ContentComponent';
import styles from './styles/ProfileFormStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

const validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validate = values => {
  const errors = {};
  //Name
  if (!values.name) {
    errors.name = 'Valor requerido';
  } else if (values.name.length > 250) {
    errors.name = 'Debe ser menor a 250 caracteres';
  }
  //LastName
  if (!values.lastName) {
    errors.lastName = 'Valor requerido';
  } else if (values.lastName.length > 250) {
    errors.lastName = 'Debe ser menor a 250 caracteres';
  }
  //Email
  if (!values.email) {
    errors.email = 'Valor requerido';
  } else if (!validateEmail(values.email)) {
    errors.email = 'El correo electrónico no es válido';
  } else if (values.email.length > 250) {
    errors.email = 'Debe ser menor a 250 caracteres';
  }
  //Boat Model
  if (!values.boatModel) {
    errors.boatModel = 'Valor requerido';
  } else if (values.boatModel.length > 250) {
    errors.boatModel = 'Debe ser menor a 250 caracteres';
  }
  //Engine Type
  if (!values.engineType) {
    errors.engineType = 'Valor requerido';
  } else if (values.engineType.length > 250) {
    errors.engineType = 'Debe ser menor a 250 caracteres';
  }
  //Registration Number
  if (values.registrationNumber && values.registrationNumber.length > 250) {
    errors.registrationNumber = 'Debe ser menor a 250 caracteres';
  }
  return errors;
};

class RenderTextInput extends Component {
  render() {
    const { input: { onChange, value }, onSubmitEditing, keyboardType, label, returnKeyType, meta: { touched, error } } = this.props;
    return (
      <FloatLabelTextInput ref='textInput' onSubmitEditing={onSubmitEditing} returnKeyType={returnKeyType} keyboardType={keyboardType} onChangeText={onChange}
        value={value} touched={touched} error={error}  >{label}</FloatLabelTextInput>
    );
  }
}

const renderDropdownInput = ({ input: { onChange, value }, children, mode, label, returnKeyType, meta: { touched, error } }) => (
  <View>
    <FloatLabelPicker returnKeyType={returnKeyType} mode={mode} onValueChange={onChange} selectedValue={value} touched={touched} error={error} placeholder={label} >
      {children}
    </FloatLabelPicker>
  </View>
);

class ProfileForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <ScrollView style={{ padding: 0 }}>
        <Content>
          <View style={styles.btnImageContainer}>
            <View style={styles.imageContainer} >
              <Image source={require('../images/nobody.jpg')} style={styles.image} />
            </View>
            <Button style={styles.btnImage} >
              <Icon name='camera' size={25} color='white' />
            </Button>
          </View>
          <Field name='name' returnKeyType='next' component={RenderTextInput} label='Nombre'
            onSubmitEditing={() => this.refs.lastNameInput.getRenderedComponent().refs.textInput.focus()} />
          <Field name='lastName' returnKeyType='next' component={RenderTextInput} label='Apellido' withRef ref='lastNameInput'
            onSubmitEditing={() => this.refs.emailInput.getRenderedComponent().refs.textInput.focus()} />
          <Field name='email' returnKeyType='next' component={RenderTextInput} keyboardType='email-address' label='Correo electrónico' ref='emailInput' withRef
            onSubmitEditing={() => this.refs.boatModelInput.getRenderedComponent().refs.textInput.focus()} />
          <Field name='boatModel' returnKeyType='next' component={RenderTextInput} label='Modelo de embarcación' ref='boatModelInput' withRef
            onSubmitEditing={() => this.refs.engineTypeInput.getRenderedComponent().refs.textInput.focus()} />
          <Field name='engineType' returnKeyType='next' component={RenderTextInput} label='Motor (marca y potencia)' ref='engineTypeInput' withRef
            onSubmitEditing={() => this.refs.registrationNumberInput.getRenderedComponent().refs.textInput.focus()} />
          <Field name='registrationNumber' returnKeyType='next' component={RenderTextInput} label='Patente' ref='registrationNumberInput' withRef />
          <Field name='vehicleType' returnKeyType='next' mode='dropdown' component={renderDropdownInput} label='Tipo de vehículo'>
            <Picker.Item label='Lancha' value='MotorBoat' />
            <Picker.Item label='Gomón' value='Boat' />
            <Picker.Item label='Yate' value='Yacht' />
            <Picker.Item label='Velero' value='SailingBoat' />
            <Picker.Item label='Moto de agua' value='WaterBike' />
            <Picker.Item label='Crucero' value='Cruise' />
          </Field>
          <Field name='hullSize' returnKeyType='done' mode='dropdown' component={renderDropdownInput} label='Tamaño del casco'>
            <Picker.Item label='Hasta 5mts' value='Small' />
            <Picker.Item label='Entre 5mts y 8mts' value='Medium' />
            <Picker.Item label='Mayor a 8mts' value='Large' />
          </Field>
          <View style={styles.buttonContainer} >
            <Button style={styles.button} textStyle={styles.buttonText} onPress={handleSubmit} isLoading={submitting} >
              Guardar
        </Button>
          </View>
        </Content>

      </ScrollView>
    );
  }
}

export default reduxForm({
  form: 'profileForm',
  validate
})(ProfileForm);
