import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Strings } from '../constants';

import WelcomeView from './WelcomeView';
import AddItemModal from '../components/AddItemModal';
import AddItemForm from '../components/AddItemForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const items = useQuery(Item);

  if (items.length === 0) {
    return <WelcomeView />
  }



  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 32 }}>
        {Strings.appName}
      </Text>

      <Button
        mode="contained"
        onPress={() => setAddModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Piece
      </Button>
      <AddItemModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} >
        {<AddItemForm onClose={() => setAddModalVisible(false)}/>}
      </AddItemModal>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Wardrobe')}
      >
        View Wardrobe
      </Button>

    </View>
  );
}
