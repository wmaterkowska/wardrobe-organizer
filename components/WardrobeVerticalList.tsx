import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import ItemCard from './ItemCard';

import { isRealmList } from '../hooks/useGroupedItems';

import { Item } from '../database/models/Item';
import { NumColumns } from '../context/WardrobeContext';
import { ALL_ITEM_PROPERTIES, propertyModelDictionary, LEVELS, WANT_ARRAY } from '../constants/index';

type Props = {
  items: Item[];
  numColumns: NumColumns;
  zoom: int;
  navigation;
}

export default function WardrobeVerticalList({items, numColumns, zoom, navigation}: Props) {

  const [filteredItems, setFilteredItems ] = useState<Item[]>(items);
  const [chosenProperty, setChosenProperty] = useState<string | null>(null);
  const [propertyArray, setPropertyArray] = useState([]);
  const [filter, setFilter] = useState<string | null>(null);

  const {main, category, color, pattern, fit, cut, textile, occasion, feels} = useAllPropertyManagers();
  const modelPropertyArrayDictionary = {
    'main_category': main,
    'category': category,
    'colors': color,
    'patterns': pattern,
    'fits': fit,
    'cuts': cut,
    'textiles': textile,
    'occasions': occasion,
    'feel_in': feels,
  };

  useEffect(() => {
    if (!chosenProperty) return;
    if (modelPropertyArrayDictionary[chosenProperty]) {
      setPropertyArray(modelPropertyArrayDictionary[chosenProperty].allProperties);
    } else if (LEVELS[chosenProperty]) {
      const levelsArray = LEVELS[chosenProperty]
      setPropertyArray(levelsArray);
    } else {
      setPropertyArray(WANT_ARRAY)
    }
  }, [propertyArray, chosenProperty, filteredItems]);

  useEffect(() => {
    if (!filter) {setFilteredItems(items)};
    const newItemSet =  items.filter((i) => {
      if (isRealmList(i[chosenProperty])) {
        return i[chosenProperty].map((p) => p.name).includes(filter);
      } else {
        return i[chosenProperty] === filter;
      }
    });
    setFilteredItems(newItemSet);
  }, [filter]);

  const handlePropertyChoose = (property: string) => {
    setChosenProperty(property);
  };

  const handleFilter = (prop) => {
    setFilter(prop);
  };

  return (
    <View style={{ flex: 1 }}>
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
              onPress={() => handlePropertyChoose(k)}
            >{ALL_ITEM_PROPERTIES[k]}</Button>
          ))}
        </Surface>
      </ScrollView>

      {propertyArray.length > 0 && (
        <View style={{ margin: 5 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
            <Surface style={styles.propertyButtonsContainer} elevation={0}>
              {propertyArray.map((p, idx) => (
                <Button
                  style={styles.propertyButton}
                  compact={true}
                  key={idx}
                  onPress={() => handleFilter(p.name || p)}
                >{p.name || p}</Button>
              ))}
            </Surface>
          </ScrollView>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }} >
        <View style={styles.wardrobeContainer}>
          {Array.from(Array(numColumns)).map((_, colIndex) => (
            <View style={styles.wardrobeColumn} key={colIndex}>
              {filteredItems.filter((item, idx) => idx % numColumns === colIndex).map((i) => (
                <ItemCard
                  key={i.id}
                  item={i}
                  onPress={() =>
                    navigation.navigate('ItemDetail', {
                      itemId: i.id,
                    })
                  }
                  zoom={zoom}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wardrobeContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: "row",
  },
  wardrobeColumn: {
    flex: 1,
  },
  propertyButtonsContainer: {
    flexDirection: 'row',
  },
  propertyButton: {
  }
});