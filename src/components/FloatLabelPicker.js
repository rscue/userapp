import React, { Component, PropTypes } from 'react';
import styles from './styles/FloatLabelPickerStyle';

import {
  Picker,
  Text,
  View
} from 'react-native';



class FloatLabelPicker extends Component {
  _renderLabel = () => {
    return (
      <Text ref='label' style={[styles.label, this.props.labelStyle]}>
        {this.props.placeholder}
      </Text>
    );
  }

  render() {
    const props = {
      autoCapitalize: this.props.autoCapitalize,
      autoCorrect: this.props.autoCorrect,
      autoFocus: this.props.autoFocus,
      bufferDelay: this.props.bufferDelay,
      clearButtonMode: this.props.clearButtonMode,
      clearTextOnFocus: this.props.clearTextOnFocus,
      controlled: this.props.controlled,
      editable: this.props.editable,
      enablesReturnKeyAutomatically: this.props.enablesReturnKeyAutomatically,
      keyboardType: this.props.keyboardType,
      multiline: this.props.multiline,
      onBlur: this.props.onBlur,
      onChange: this.props.onChange,
      onChangeText: this.props.onChangeText,
      onEndEditing: this.props.onEndEditing,
      onFocus: this.props.onFocus,
      onSubmitEditing: this.props.onSubmitEditing,
      password: this.props.password,
      returnKeyType: this.props.returnKeyType,
      selectTextOnFocus: this.props.selectTextOnFocus,
      selectionState: this.props.selectionState,
      style: [styles.input],
      testID: this.props.testID,
      value: this.props.value,
      underlineColorAndroid: this.props.underlineColorAndroid, // android TextInput will show the default bottom border
      onKeyPress: this.props.onKeyPress,
      mode: this.props.mode,
      selectedValue: this.props.selectedValue,
      onValueChange: this.props.onValueChange
    };
    const elementStyles = [styles.element];

    if (this.props.pickerStyle) {
      props.style.push(this.props.pickerStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    return (
      <View style={elementStyles} >
        {this._renderLabel()}
        <Picker {...props} ref='picker' style={styles.picker} >
          {this.props.children}
        </Picker>
      </View>
    );
  }
}

const textPropTypes = Text.propTypes || View.propTypes;
const textInputPropTypes = Picker.propTypes || textPropTypes;
FloatLabelPicker.propTypes = {
  ...textInputPropTypes,
  pickerStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
  placeholder: PropTypes.string.isRequired
};

export default FloatLabelPicker;
