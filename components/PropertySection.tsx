import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import PropertyList from './PropertyList';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { Item } from '../database/index';

type Props = {
  title?: string;
  propertyName?: string;
  properties?: [];
  selectedPropertyIds?: [];
  handleSelect?: () => void;
  isSingleSelect?: boolean;
  isEditable?: boolean;
  onPressEditIcon: () => void;
}

export default function PropertySection({
  title,
  propertyName,
  properties,
  selectedPropertyIds,
  handleSelect,
  isSingleSelect = false,
  isEditable,
  onPressEditIcon, } : Props) {

  const { isEditMode } = useWardrobeContext();

  return (
    <View style={(isEditMode && isEditable) || isSingleSelect ? styles.editPropertyView : styles.propertyView}>
      {isEditable || !isSingleSelect ? (
        <PropertyList
          title={title}
          propertyName={isEditMode ? null : propertyName}
          properties={properties}
          selectable={true}
          selectedIds={selectedPropertyIds ? selectedPropertyIds : []}
          onToggle={handleSelect}
          singleSelect={isSingleSelect}
        />
      ) : <Text variant="bodyLarge">{propertyName}</Text> }
      { isEditMode ? (
        <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
      ) : null }
    </View>
  )
}

const styles = StyleSheet.create({
  propertyView : {
    flexDirection: 'column',
  },
  editPropertyView: {
    flexDirection: 'column',
  }
});