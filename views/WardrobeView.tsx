import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

import { useQuery } from '@realm/react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import { Item } from '../database/models/Item'
import ItemCard from '../components/ItemCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Wardrobe'>;

export default function WardrobeView({ navigation }: Props) {

  const items = useQuery(Item);
  console.log(items);

  if (!items.length) {
    return (
      <View>
        <Text>No items found. Add your first piece!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
         <ItemCard
           item={item}
           onPress={() =>
             navigation.navigate('ItemDetail', {
               itemId: item.id,
             })
           }
         />
      )}
    />
  );
}

