import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Color } from '../database/models/Color';

import ColorDot from './ColorDot';

type Props = {
  colors: Color[];
  selectable?: Boolean;
  selectedIds?: string[];
  onToggle?: (id: string) => void;
}

export default function ColorList({
  colors,
  selectable = false,
  selectedIds = [],
  onToggle, }: { Props }) {

  const handleToggle = (id: string) => {
    if (!onToggle) return;

    const alreadySelected = selectedIds?.includes(id);
      onToggle(
        alreadySelected
        ? id
        : id
      )
    }

  return (
      <View style={styles.rowList}>
        {
          colors.map((color, index) =>
            ( <ColorDot
              key={index}
              colorCode={color.color_code}
              size={45}
              selectable={selectable}
              selected={selectedIds?.includes(color.id)}
              onPress={selectable ? () => handleToggle(color.id) : undefined }
              /> ))
        }
      </View>
  )
}

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 16,
  }
})