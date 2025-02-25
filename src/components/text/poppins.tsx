import React from 'react';
import {Text, StyleSheet} from 'react-native';

// Komponen Poppins dengan default style
const Poppins: React.FC<{style?: object; children: React.ReactNode}> = ({
  style,
  children,
}) => {
  return (
    <Text style={[styles.defaultStyle, style]}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Poppins-Regular', 
    fontSize: 16, 
    color: '#000', 
  },
});

export default Poppins;
