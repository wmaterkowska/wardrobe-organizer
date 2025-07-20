import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useExpandableList } from '../hooks/useExpandableList';

import { Color } from '../database/models/Color';

import ColorDot from './ColorDot';

type Props = {
  colors: Color[];
  selectable?: Boolean;
  selectedIds?: string[];
  onToggle?: (id: string) => void;
  size?: int;
}

export default function ColorList({
  colors,
  selectable = false,
  selectedIds = [],
  onToggle,
  size = 45}: Props) {

  const { visibleItems, showToggle, toggle, expanded } = useExpandableList(colors, 10);

  const handleToggle = (id: string) => {
    if (!onToggle) return;
    const alreadySelected = selectedIds?.includes(id);
      onToggle(
        alreadySelected
        ? id
        : id
      )
    };

  return (
      <View style={styles.rowList}>
        {
          visibleItems.map((color, index) =>
            ( <ColorDot
              key={index}
              colorCode={color.color_code}
              size={size}
              selectable={selectable}
              selected={selectedIds?.includes(color.id)}
              onPress={selectable ? () => handleToggle(color.id) : undefined }
              /> ))
        }
        {showToggle && (
          <IconButton onPress={toggle} icon={expanded ? 'chevron-up' : 'chevron-down'}/>
        )}
      </View>
  )
}

const styles = StyleSheet.create({
  rowList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})