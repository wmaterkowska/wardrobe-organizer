import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  imageUri?: string;
  onAdd?: () => void;
  onChange?: () => void;
  imageHeight? : int;
  imageWidth?: int
};

export default function ImageSection({imageUri, onAdd, onChange, imageHeight, imageWidth}: Props) {

  const { isEditMode, setIsEditMode } = useWardrobeContext();

  return (
  <View style={styles.imageContainer}>
    { !isEditMode  && imageWidth == undefined ?
      <Button onPress={onAdd} mode='outlined' style={styles.addButton} >
        Add Photo
      </Button> : null }
    {imageUri && (
      <Image
        source={{ uri: imageUri }}
        style={{ width: imageWidth ?? 200, height: imageHeight ?? 200, borderRadius: 10 }}
      />
    )}
    { isEditMode ?
      <Button onPress={onChange} mode='outlined' style={styles.changeButton} >
        Change Photo
      </Button> : null }
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