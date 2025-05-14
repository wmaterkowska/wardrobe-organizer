import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  colorCode: string;
  size?: number;
  selectable?: boolean;
  selected?: boolean;
  onPress?: () => void;
};

export default function ColorDot({
  colorCode,
  size = 32,
  selectable = false,
  selected = false,
  onPress,
  }: Props) {

  const haloSize = size + 3;

  const Dot = (
    <View
      style={[
        styles.haloContainer,
        selected && styles.selectedHalo,
        selected && { width: haloSize, height: haloSize, borderRadius: haloSize / 2 },
      ]}
    >
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
    </View>
  );

  return selectable ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {Dot}
    </TouchableOpacity>
    ) : ( Dot );

}

const styles = StyleSheet.create({
  dot: {
    marginTop: 4,
  },
  haloContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  selectedHalo: {
    borderWidth: 2,
  },
});
