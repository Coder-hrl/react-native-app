import {View} from '@ant-design/react-native';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const LargeButton = ({
  onPress = () => {},
  loading = false,
  style = {},
  textStyle = {},
  children,
}) => {
  return (
    <TouchableOpacity
      style={[styles.LargeButton, style]}
      onPress={loading ? () => {} : onPress}>
      <View style={[styles.ButtonText, textStyle]}>
        {loading ? 'loading' : children}
      </View>
    </TouchableOpacity>
  );
};

export const Button = ({type, children, ...props}) => {
  switch (type) {
    case 'large':
      return <LargeButton {...props}>{children}</LargeButton>;
    default:
      break;
  }
};

const styles = StyleSheet.create({
  LargeButton: {
    width: '100%',
    height: 34,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#4a85d3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});
