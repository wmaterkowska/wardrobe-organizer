import React, { useState } from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import ItemCard from './ItemCard';
import PropertyChip from './PropertyChip';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';
import { MainCategory } from '../database/models/MainCategory';

type Props = {
  items: Item[];
  navigation;
}

export default function WardrobeHorizontalList({items, navigation} : Props) {

  const categories = useQuery(Category);
  const mains = useQuery(MainCategory);

  const [categoriesFiltered, setCategoriesFiltered] = useState<Category[]>(categories);
  const [mainChosen, setMainChosen] = useState<MainCategory>(mains.find((m) => m.name === 'Clothes'));

  const handleMainSelect = (id: string) => {
    const mainFromId = mains.find((m) => m.id === id);
    console.log('main', mainFromId.name);
    console.log('categories', mainFromId.categories);
    setMainChosen(mainFromId);
    setCategoriesFiltered(mainFromId.categories);
  };


  return (
    <View style={{ flex: 1 }}>
      <Surface elevation={0} style={styles.mains}>
        {mains.map((m) => (
          <PropertyChip
            key={m.id}
            label={m.name}
            selectable={true}
            selected={m.id === mainChosen.id}
            onPress={() => handleMainSelect(m.id)}/>
        ))}
      </Surface>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} >
        <View>
        {categoriesFiltered.map((cat, index) => (
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
  mains: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 4,
  },
  listContainer: {
    marginTop: 16,
  },
  title: {
    marginLeft: 16,
    paddingBottom: 4,
  },
})