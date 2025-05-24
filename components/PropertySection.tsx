import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import PropertyList from './PropertyList';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { Item } from '../database/index';

type Props = {
  title?: string;
  properties?: [];
  selectedPropertyIds?: [];
  handleSelect?: () => void;
  isSingleSelect?: boolean;
  isEditable?: boolean;
  onPressEditIcon: () => void;
}

export default function PropertySection({
  title,
  properties,
  selectedPropertyIds,
  handleSelect,
  isSingleSelect = false,
  isEditable,
  onPressEditIcon, } : Props) {

  const { isEditMode } = useWardrobeContext();

  return (
    <View style={isEditMode && isEditable ? styles.editPropertyView : styles.propertyView}>
      {!isEditable ? (
        <Text variant="bodyMedium">{title}</Text>
      ) : (
        <PropertyList
          title={isEditMode ? null : title}
          properties={properties}
          selectable={true}
          selectedIds={selectedPropertyIds ? selectedPropertyIds : []}
          onToggle={handleSelect}
          singleSelect={isSingleSelect}
        />
      ) }
      { isEditMode ? (
        <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
      ) : null }
    </View>
  )
}

const styles = StyleSheet.create({
  propertyView : {
    flexDirection: 'row',
  },
  editPropertyView: {
    flexDirection: 'column',
  }
});