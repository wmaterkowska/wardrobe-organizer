import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

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

  const { colors: themeColors } = useTheme();
  const themedStyles = styles(themeColors);

  const haloSize = size + 8;

  const Dot = (
    <View
      style={[
        themedStyles.haloContainer,
        themedStyles.selectedHalo,
        selected && { width: haloSize, height: haloSize, borderRadius: haloSize / 2, borderColor: themeColors.onBackground },
      ]}
    >
    <View
      style={[
        themedStyles.dot,
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

const styles = (colors) => StyleSheet.create({
  dot: {
    margin: 2,
  },
  haloContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  selectedHalo: {
    borderWidth: 2,
    borderColor: 'transparent',
  },
});
