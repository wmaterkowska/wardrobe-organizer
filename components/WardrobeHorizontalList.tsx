import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import ItemCard from './ItemCard';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';

type Props = {
  items: Item[];
  navigation;
}

export default function WardrobeHorizontalList({items, navigation} : Props) {

  const categories = useQuery(Category);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} >
        <View>
        {categories.map((cat, index) => (
          <View style={styles.listContainer}>
            <Text variant="titleMedium" style={styles.title}>{cat.name}</Text>
            <Surface key={index}>
            <ScrollView
              horizontal={true}
              style={{padding: 16}}
              contentContainerStyle={{ paddingRight: 34}}
            >
            {items.filter((item) => item.category.id === cat.id).map((i) => (
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
        ))}
        </View>
      </ScrollView>
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