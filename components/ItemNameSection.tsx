import { View, StyleSheet, TextInput } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  itemName?: string;
  onChange?: () => void;
  isEditable?: boolean;
  onPressEditIcon?: () => void;
}

export default function ItemNameSection({itemName, onChange, isEditable, onPressEditIcon}: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View style={styles.nameContainer}>
    {isEditMode || isEditable ? (
      <View>
        {!itemName || !isEditMode ? ( <Text variant="bodyLarge">item name</Text> ) : null }
        { isEditable ? (
        <TextInput
          style={styles.input}
          placeholder="e.g., Jacket"
          value={itemName}
          onChangeText={onChange}
        /> ) : <Text variant="headlineLarge">{itemName}</Text> }
      </View>
      ) : <Text variant="headlineLarge">{itemName}</Text> }
    { isEditMode ? (
      <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
    ) : null }
  </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  }
});