import { View, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  imageUri?: string;
  onPress?: () => void;
};

export default function ImageSection({imageUri, onPress}: Props) {

  return (
  <View style={styles.imageContainer}>
    <Button onPress={onPress} mode='outlined'>Add Photo</Button>
    {imageUri && (
      <Image
        source={{ uri: imageUri }}
        style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }}
      />
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  imageContainer : {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  }

});