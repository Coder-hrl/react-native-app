import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function Input({onChangeText, value, style, ...prop}) {
  return (
    <TextInput
      style={[styles.textInput, style]}
      onChangeText={text => onChangeText(text)}
      value={value}
      autoComplete="off"
      {...prop}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#e8e8e8',
    borderRadius: 30,
    borderWidth: 1,
    borderRadius: 10,
    padding: 0,
    paddingHorizontal: 10,
  },
});

export default Input;
