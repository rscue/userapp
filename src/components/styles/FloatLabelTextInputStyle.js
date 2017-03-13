import { StyleSheet } from 'react-native';

const labelStyleObj = {
  marginTop: 21,
  paddingLeft: 9,
  color: '#AAA',
  position: 'absolute'
};

export default StyleSheet.create({
  element: {
    position: 'relative'
  },  
  label: labelStyleObj
});

export const cleanStyle = {
  fontSize: 20,
  top: 7
};

export const dirtyStyle = {
  fontSize: 12,
  top: -17,
};

