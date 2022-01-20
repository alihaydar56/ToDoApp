import React, {useState} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const ButtonComponent = props => {
  const styles = StyleSheet.create({
    button: {
      margin: '2%',
      marginBottom: '5%',
      alignSelf: 'center',
      width: '80%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: props.bgcolor,
      color: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
    buttonText: {
      color: props.textColor,
    },
  });
  return (
    <TouchableOpacity
      disabled={props.disabled ? props.disabled : false}
      style={styles.button}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
