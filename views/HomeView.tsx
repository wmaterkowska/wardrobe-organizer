import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 32 }}>
        Wardrobe Organizer
      </Text>

      <Button
        mode="contained"
        onPress={() => {}}
        style={{ marginBottom: 16 }}
      >
        Add New Item
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Wardrobe')}
      >
        View Wardrobe
      </Button>
    </View>
  );
}
