import React, { useState, useEffect } from 'react';
import { useWardrobeContext } from '../context/WardrobeContext';
import { useGroupedItems, ItemKey } from '../hooks/useGroupedItems';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';;
import ItemCard from './ItemCard';
import PropertyChip from './PropertyChip';
import HorizontalItemList from './HorizontalItemList';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';
import { MainCategory } from '../database/models/MainCategory';

import { ALL_ITEM_PROPERTIES } from '../constants/index';

type Props = {
  items: Item[];
  navigation;
}

export default function WardrobeHorizontalList({items, navigation} : Props) {

  const { isFilter } = useWardrobeContext();
  const mains = useQuery(MainCategory);
  const categories = useQuery(Category);

  const [mainChosen, setMainChosen] = useState<MainCategory | null>(mains.find((m) => m.name === 'Clothes'));
  const [itemsForMain, setItemsForMain] = useState<Items[]>(items.filter((item) => item.main_category.name === 'Clothes'));
  const [categoriesFiltered, setCategoriesFiltered] = useState<Category[]>(mainChosen?.categories || categories);

  const [groupByKey, setGroupByKey] = useState<ItemKey | null>(null);
  const groupedItems = useGroupedItems(itemsForMain, groupByKey);

  const handleMainSelect = (id: string) => {
    const mainFromId = mains.find((m) => m.id === id);
    setMainChosen(mainFromId);
    setItemsForMain(items.filter((i) => i.main_category.id === mainFromId.id));
    setCategoriesFiltered(mainFromId.categories);
  };

  useEffect(() => {
    console.log('groupedItems', groupedItems)
  },[itemsForMain]);


  const handleAll = () => {
    setCategoriesFiltered(categories);
    setMainChosen(null);
    setItemsForMain(items);
  };

  return (
    <View style={{ flex: 1 }}>
      {isFilter ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
          <Surface style={styles.propertyButtonsContainer} elevation={0}>
            {Object.keys(ALL_ITEM_PROPERTIES).map((k, idx) => (
              <Button
                style={styles.propertyButton}
                compact={true}
                key={idx}
                onPress={() => setGroupByKey(k)}
              >{ALL_ITEM_PROPERTIES[k]}</Button>
            ))}
          </Surface>
        </ScrollView>
      ) : null }
      <Surface elevation={0} style={styles.mains}>
        {mains.map((m, idx) => (
          <PropertyChip
            key={m?.id || idx}
            label={m?.name}
            selectable={true}
            selected={m.id === mainChosen?.id}
            onPress={() => handleMainSelect(m.id)}/>
        ))}
        <PropertyChip
          label='All'
          selectable={true}
          selected={mainChosen === null}
          onPress={()=> handleAll()}/>
      </Surface>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} >
        <View>
        {Object.keys(groupedItems).length !== 0 ? (
         <View>
           {Object.entries(groupedItems).map(([groupName, groupItems], idx) => (
              <HorizontalItemList items={groupItems} key={idx} propertyName={groupName}/>
           ))}
         </View>
        ) : (
        <View>
        {categoriesFiltered.map((cat, index) => (
          <View style={styles.listContainer} key={index}>
            <Text variant="titleMedium" style={styles.title}>{cat.name}</Text>
            <Surface>
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
        </View>)}
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
    justifySelf: 'flex-start',
  },
  listContainer: {
    marginTop: 16,
  },
  title: {
    marginLeft: 16,
    paddingBottom: 4,
  },
  propertyButtonsContainer: {
    flexDirection: 'row',
  },
  propertyButton: {
  }
})