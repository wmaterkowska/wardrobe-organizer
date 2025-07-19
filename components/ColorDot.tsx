import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import { contrastRatio } from '../utility/contrastUtils';

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

  const isNotVisible = contrastRatio(colorCode, themeColors.background) < 3;

  const haloSize = size + 8;

  const Dot = (
    <View
      style={[
        themedStyles.haloContainer,
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
        isNotVisible &&  {
          borderColor: themeColors.onBackground,
          borderWidth: 0.2,
          }
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
    //margin: 2,
  },
  haloContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  shadow: {
    shadowColor: colors.onBackground,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  }
});
