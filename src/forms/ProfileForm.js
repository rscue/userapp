import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { View, Text, TouchableOpacity } from 'react-native';
import FloatLabelTextInput from '../components/FloatLabelTextInput';

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Valor requerido';
  } else if (values.name.length > 250) {
    errors.name = 'Debe ser menor a 250 caracteres';
  }
  if (!values.lastName) {
    errors.lastName = 'Valor requerido';
  } else if (values.lastName.length > 250) {
    errors.lastName = 'Debe ser menor a 250 caracteres';
  }
  return errors;
};

const renderTextInput = ({ input: { onChange, value }, label, returnKeyType, meta: { touched, error } }) => (
  <View>
    <FloatLabelTextInput returnKeyType={returnKeyType} onChangeText={onChange} value={value} touched={touched} error={error} >{label}</FloatLabelTextInput>
  </View>
);

const ProfileForm = (props) => {
  const { handleSubmit, submitting } = props;
  return (
    <View>
      <Field name='name' returnKeyType='next' component={renderTextInput} label='Nombre' />
      <Field name='lastName' returnKeyType='done' component={renderTextInput} label='Apellido' />
      <TouchableOpacity onPress={handleSubmit} disabled={submitting}>
        <Text >Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default reduxForm({
  form: 'profileForm',
  validate
})(ProfileForm);
