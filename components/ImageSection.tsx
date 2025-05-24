import { View, Image, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  imageUri?: string;
  onAdd?: () => void;
  onChange?: () => void;
  imageHeight? : int;
  imageWidth?: int;
  isEditable?: boolean;
  onPressEditIcon?: () => void;
};

export default function ImageSection({
  imageUri,
  onAdd,
  onChange,
  imageHeight,
  imageWidth,
  isEditable,
  onPressEditIcon, }: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View style={styles.imageContainer}>
    { isEditable  && imageWidth == undefined ?
      <Button onPress={onAdd} mode='outlined' style={styles.addButton} >
        Add Photo
      </Button> : null }
    {imageUri && (
      <Image
        source={{ uri: imageUri }}
        style={{ width: imageWidth ?? 200, height: imageHeight ?? 200, borderRadius: 10 }}
      />
    )}
    { isEditMode && isEditable ?
      <Button onPress={onChange} style={styles.changeButton} >
        {imageUri ? 'Change Photo' : 'Add Photo'}
      </Button> : null }
    { isEditMode ? (
      <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
    ) : null }
  </View>
  );
}

const styles = StyleSheet.create({
  imageContainer : {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  addButton: {
    marginBottom: 10,
  },
changeButton: {
    marginTop: 10,
  }
});