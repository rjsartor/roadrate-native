import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet, TextStyle } from 'react-native';

interface MyButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
}

const MyButton: React.FC<MyButtonProps> = ({ title, textStyle, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={[styles.button, rest.style]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(52, 110, 98)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
   
    justifyContent: 'center',
  },
  buttonText: {
    color: 'whitesmoke',
    fontSize: 14,
  },
});

export default MyButton;
