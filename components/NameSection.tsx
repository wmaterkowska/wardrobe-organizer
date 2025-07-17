import { View, StyleSheet, TextInput } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  name?: string;
  onChange?: () => void;
  isEditable?: boolean;
  onPressEditIcon?: () => void;
}

export default function NameSection({name, onChange, isEditable, onPressEditIcon}: Props) {

  const { isEditMode, isSelectMode } = useWardrobeContext();

  return (
  <View style={styles.nameContainer}>
    {isEditMode || isEditable ? (
      <View style={{width: '100%'}}>
        {!name || !isEditMode ? ( <Text variant="bodyLarge">{isSelectMode ? 'outfit name' : 'item name'}</Text> ) : null }
        { isEditable ? (
        <TextInput
          style={styles.input}
          placeholder={isSelectMode ? "e.g., Casual Friday" : "e.g., Jacket"}
          value={name}
          onChangeText={onChange}
        /> ) : <Text variant="headlineLarge">{name}</Text> }
      </View>
      ) : <Text variant="headlineLarge">{name}</Text> }
    { isEditMode ? (
      <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
    ) : null }
  </View>
  )
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  }
});