import React from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacerProps {
  height?: number;
  width?: number;
  style?: ViewStyle;
}

const Spacer: React.FC<SpacerProps> = ({
  height = 0,
  width = 0,
  style = {},
  ...rest
}) => {
  const _width = width * 8;
  const _height = height * 8;
  return (
    <View
      style={{
        width: _width,
        height: _height,
        ...style
      }}
      {...rest}
    />
  );
};

export default Spacer;