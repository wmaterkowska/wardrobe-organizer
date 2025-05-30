import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickOrCaptureImage = async (): Promise<string | null> => {

  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!cameraPermission.granted || !libraryPermission.granted) {
    Alert.alert(
      'Permission required',
      'Camera and media library permissions are required to use this feature.'
    );
    return null;
  }

  return new Promise((resolve) => {
    Alert.alert('Upload Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
          });

          if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            const filename = image.uri.split('/').pop();
            const newPath = FileSystem.documentDirectory + filename;

            try {
              await FileSystem.moveAsync({
                from: image.uri,
                to: newPath,
              });

            resolve(newPath);
            } catch (error) {
              console.error('Error moving file:', error);
              resolve(null);
            }
          } else {
            resolve(null);
          }
        },
      },
      {
        text: 'Choose from Library',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.8,
          });

          if (!result.canceled && result.assets.length > 0) {
            resolve(result.assets[0].uri);
          } else {
            resolve(null);
          }
        },
      },
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(null) },
    ]);
  });
};
