import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';

import ColorList from './ColorList';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { Color } from '../database/index';

type Props = {
  colors?: Color[];
  selectedColorIds?: string[];
  handleSelect?: () => void;
  isEditable?: boolean;
  onPressEditIcon?: () => void;
}

export default function ColorSection({
  colors,
  selectedColorIds,
  handleSelect,
  isEditable,
  onPressEditIcon, } : Props) {

  const { isEditMode } = useWardrobeContext();

  return (
    <View style={isEditMode && isEditable ? styles.editColorsView : styles.colorsView}>
      { (isEditMode && colors.length === 0 ) ? (<Text>colors</Text>) : null }
      <ColorList
        colors={colors}
        selectable={isEditable}
        selectedIds={(isEditMode || isEditable) ? selectedColorIds : null}
        onToggle={handleSelect}
      />
      { isEditMode ? (
        <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
      ) : null }
    </View>
  )
}

const styles = StyleSheet.create({
  colorsView : {
    flexDirection: 'row',
  },
  editColorsView: {
    flexDirection: 'column',
  },
});