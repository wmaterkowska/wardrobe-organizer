import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import ColorDot from './ColorDot';

type Props = {
  label: string;
  selectable?: boolean;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  onClose?: () => void;
  color?: string;
  colorSize?: int;
}

export default function PropertyChip({
  label,
  selectable = false,
  selected = false,
  onPress,
  icon,
  onClose,
  color,
  colorSize,
  }: Props) {

  return (
    <Chip
      icon={icon}
      onPress={onPress}
      type='outlined'
      compact={true}
      accessibilityLabel={label}
      accessibilityRole='button'
      style={styles.chip}
      selected={selected}
      showSelectedCheck={(selectable && selected) ? true : false}
      avatar={color ? (<ColorDot colorCode={color} size={colorSize} />) : null}
      >{label}</Chip>
  )

}

const styles = StyleSheet.create({
  chip: {
    width: 'auto',
    marginRight: 4,
    marginBottom: 4,
  },
});