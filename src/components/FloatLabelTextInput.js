import React, { Component, PropTypes } from 'react';
import styles, { cleanStyle, dirtyStyle } from './styles/FloatLabelTextInputStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextInput,
  Animated,
  Easing,
  Text,
  View
} from 'react-native';



class FloatLabelTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.value,
      dirty: !!props.value
    };
    let style = this.state.dirty ? dirtyStyle : cleanStyle;
    this.state.labelStyle = {
      fontSize: new Animated.Value(style.fontSize),
      top: new Animated.Value(style.top)
    };
  }

  _animate = (dirty) => {
    var nextStyle = dirty ? dirtyStyle : cleanStyle;
    var labelStyle = this.state.labelStyle;
    var anims = Object.keys(nextStyle).map(prop => {
      return Animated.timing(
        labelStyle[prop],
        {
          toValue: nextStyle[prop],
          duration: 150
        },
        Easing.ease
      );
    });

    Animated.parallel(anims).start();
  }

  _onBlur = () => {
    if (!this.state.text) {
      this._animate(false);
      this.setState({ dirty: false });
    }

    if (this.props.onBlur) {
      this.props.onBlur(arguments);
    }
  }

  _onFocus = () => {
    this._animate(true);
    this.setState({ dirty: true });
    if (this.props.onFocus) {
      this.props.onFocus(arguments);
    }
  }

  onChangeText = (text) => {
    this.setState({ text });
    if (this.props.onChangeText) {
      this.props.onChangeText(text);
    }
  }

  updateText = (event) => {
    var text = event.nativeEvent.text;
    this.setState({ text });

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  }

  _renderLabel = () => {
    let labelStyles = [this.state.labelStyle, styles.label, this.props.labelStyle];
    if (this.props.touched && this.props.error) {
      labelStyles.push(styles.error);
    }
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);
    return (
      <View>
        <Animated.Text ref='label' style={labelStyles}>
          {this.props.children}
        </Animated.Text>
        {this.props.touched && this.props.error ? (
          <AnimatedIcon name="exclamation-circle" style={[labelStyles, { right: 5 }]} />
        ) : null}
      </View>
    );
  }

  focus() {
    this.refs.textInput.focus();
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
      onBlur: this._onBlur,
      onChange: this.props.onChange,
      onChangeText: this.onChangeText,
      onEndEditing: this.updateText,
      onFocus: this._onFocus,
      onSubmitEditing: this.props.onSubmitEditing,
      password: this.props.password,
      returnKeyType: this.props.returnKeyType,
      selectTextOnFocus: this.props.selectTextOnFocus,
      selectionState: this.props.selectionState,
      style: [styles.input],
      testID: this.props.testID,
      value: this.props.value,
      underlineColorAndroid: this.props.underlineColorAndroid, // android TextInput will show the default bottom border
      onKeyPress: this.props.onKeyPress
    };
    const elementStyles = [styles.element];

    if (this.props.inputStyle) {
      props.style.push(this.props.inputStyle);
    }

    if (this.props.style) {
      elementStyles.push(this.props.style);
    }

    return (
      <View style={elementStyles} >
        {this._renderLabel()}
        <TextInput {...props} ref='textInput' />
        {this.props.touched && this.props.error ? (<Text style={styles.error}>{this.props.error}</Text>) : null}
      </View>
    );
  }
}

const textPropTypes = Text.propTypes || View.propTypes;
const textInputPropTypes = TextInput.propTypes || textPropTypes;
FloatLabelTextInput.propTypes = {
  ...textInputPropTypes,
  inputStyle: textInputPropTypes.style,
  labelStyle: textPropTypes.style,
  disabled: PropTypes.bool,
  style: Text.propTypes.style,
  error: PropTypes.string,
  touched: PropTypes.bool
};

export default FloatLabelTextInput;
