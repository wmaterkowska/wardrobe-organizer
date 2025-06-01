import { View, ScrollView, StyleSheet } from 'react-native';
import { Surface, Text }  from 'react-native-paper';
import ItemCard from './ItemCard';

import { Item } from '../database/models/Item';

type Props = {
  items: Item[];
  id?: string;
  propertyName?: string;
}

export default function HorizontalItemList({items, id, propertyName}: Props) {

  return (
    <View key={id} style={styles.listContainer}>
      <Text variant="titleMedium" style={styles.title}>{propertyName}</Text>
      <Surface>
        <ScrollView
          horizontal={true}
          style={{padding: 16}}
          contentContainerStyle={{ paddingRight: 34}}
        >
          {items.map((i) => (
            <ItemCard
              key={i.id}
              item={i}
              onPress={() =>
                navigation.navigate('ItemDetail', {
                  itemId: i.id,
                })
              }
            />
          ))}
        </ScrollView>
      </Surface>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 16,
  },
  title: {
    marginLeft: 16,
    paddingBottom: 4,
  },
})