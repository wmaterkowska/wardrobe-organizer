import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  colorCode: string;
  size?: number;
};

export default function ColorDot({ colorCode, size = 32 }: Props) {
  return (
    <View
      style={[
        styles.dot,
        {
          backgroundColor: colorCode,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    margin: 4,
    borderWidth: 1,
  },
});
