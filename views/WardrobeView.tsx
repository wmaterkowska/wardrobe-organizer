import { View, FlatList } from 'react-native';

import { Text } from 'react-native-paper';
import { useQuery } from '@realm/react';

import { Item } from '../database/models/Item'
import ItemCard from '../components/ItemCard';

export default function WardrobeView() {

  const items = useQuery(Item);

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
      renderItem={({ item }) => <ItemCard item={item} />}
    />
  );
}

