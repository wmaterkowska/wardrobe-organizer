import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

type Props = {
  label: string;
  selectable?: boolean;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
  onClose?: () => void;
}

export default function PropertyChip({
  label,
  selectable = false,
  selected = false,
  onPress,
  icon,
  onClose,
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
      >{label}</Chip>
  )

}

const styles = StyleSheet.create({
  chip: {
    margin: 4,
    width: 'auto',
  },
});