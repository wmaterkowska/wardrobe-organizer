import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Color } from '../database/models/Color';

import ColorDot from './ColorDot';

export default function ColorList({ colors }: { colors: Color[]}) {

  return (
      <View style={styles.rowList}>
        {
          colors.map((color, index) =>
            ( <ColorDot key={index} colorCode={color.color_code} size={30} /> ))
        }
      </View>
  )
}

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})