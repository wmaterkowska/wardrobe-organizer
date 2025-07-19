import React, { useState, useEffect } from 'react';
import { useWardrobeContext } from '../context/WardrobeContext';
import { useGroupedItems, ItemKey } from '../hooks/useGroupedItems';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Button, Chip } from 'react-native-paper';;
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
  onLongPressItem?: () => void;

}

export default function WardrobeHorizontalList({items, navigation, onLongPressItem} : Props) {

  const { isFilter, isSelectMode } = useWardrobeContext();
  const mains = useQuery(MainCategory);
  const categories = useQuery(Category);

  const [mainChosen, setMainChosen] = useState<MainCategory | null>(mains.find((m) => m.name === 'Clothes'));
  const [itemsForMain, setItemsForMain] = useState<Items[]>(items.filter((item) => item.main_category?.name === 'Clothes'));
  const [categoriesFiltered, setCategoriesFiltered] = useState<Category[]>(mainChosen?.categories || categories);

  const [groupByKey, setGroupByKey] = useState<ItemKey | null>(null);
  const groupedItems = useGroupedItems(itemsForMain, groupByKey);

  const handleMainSelect = (id: string) => {
    const mainFromId = mains.find((m) => m.id === id);
    setMainChosen(mainFromId);
  };

  useEffect(() => {
    if (mainChosen) {
      setItemsForMain(items.filter((i) => i?.main_category?.id === mainChosen?.id));
      setCategoriesFiltered(mainChosen.categories);
    } else {
      setItemsForMain(items);
      setCategoriesFiltered(categories);
    }
  },[mainChosen]);


  const handleAll = () => {
    setCategoriesFiltered(categories);
    setMainChosen(null);
    setItemsForMain(items);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
      <Surface elevation={0} style={styles.mains}>
        {mains.map((m, idx) => (
          <Button
            style={[styles.propertyButton, mainChosen?.name === m?.name ? styles.propertyButtonSelected : null]}
            textColor='black'
            rippleColor='transparent'
            key={m?.id || idx}
            onPress={() => handleMainSelect(m.id)}
          >{m?.name}</Button>
        ))}
        <Button
          style={[styles.propertyButton, mainChosen === null ? styles.propertyButtonSelected : null]}
          textColor='black'
          rippleColor='transparent'
          onPress={() => handleAll()}
        >All</Button>
      </Surface>
      {isFilter ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
          <Surface style={styles.propertyButtonsContainer} elevation={0}>
            {Object.keys(ALL_ITEM_PROPERTIES).slice(1).map((k, idx) => (
              <PropertyChip
                label={k}
                onPress={() => setGroupByKey(k)}
                selected={groupByKey === k ? true : false}
                key={idx}
              />
            ))}
          </Surface>
        </ScrollView>
      ) : (
        <View style={{ opacity: 0, paddingBottom: 5 }} accessible={false}>
          <Button disabled={true}></Button>
        </View>)}
      </View>
      <View style={{ flex: 1 }}>
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
            {items.filter((item) => item?.category?.id === cat.id).map((i) => (
              <ItemCard
                key={i.id}
                item={i}
                onPress={() =>
                  navigation.navigate('ItemDetail', {
                    itemId: i.id,
                  })
                }
                onLongPress={onLongPressItem}
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
    </View>
  )
}

const styles = StyleSheet.create({
  mains: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
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
    alignItems: 'center',
  },
  propertyButton: {
    padding: 0,
    margin: 0,
    color: 'black',
  },
  propertyButtonSelected: {
    borderTopWidth: 2,
    borderColor: 'black',
    borderRadius: 0,
    color: 'black',
  }
})