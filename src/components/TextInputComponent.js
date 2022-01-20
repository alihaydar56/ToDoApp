import React, {useState} from 'react';

import {TextInput, StyleSheet} from 'react-native';

const TextInputComponent = props => {
  const {value, onChangeText} = props;
  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor="grey"
      style={styles.input}
      value={value}
      onChangeText={text => {
        onChangeText(text);
      }}
      secureTextEntry={props.secure}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    color: 'black',
    margin: '4%',
    marginHorizontal: '8%',
    width: '80%',
    height: 44,
    borderRadius: 10,
    zIndex: 2,
    backgroundColor: '#FAFAFA',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
export default TextInputComponent;
