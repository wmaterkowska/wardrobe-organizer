import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import ItemCard from './ItemCard';

import { isRealmList } from '../hooks/useGroupedItems';

import { Item } from '../database/models/Item';
import { NumColumns, useWardrobeContext } from '../context/WardrobeContext';
import { ALL_ITEM_PROPERTIES, propertyModelDictionary, LEVELS, WANT_ARRAY } from '../constants/index';

type Props = {
  items: Item[];
  numColumns: NumColumns;
  zoom: int;
  navigation;
}

export default function WardrobeVerticalList({items, numColumns, zoom, navigation}: Props) {

  const { isSelectMode, setIsSelectMode } = useWardrobeContext();

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
  }, [propertyArray, chosenProperty, filteredItems, filter]);

  useEffect(() => {
    if (!filter) return;
    const newItemSet =  items.filter((i) => {
      if(!i[chosenProperty]) return;
      if (isRealmList(i[chosenProperty])) {
        return i[chosenProperty].map((p) => p.name).includes(filter);
      } else if (typeof i[chosenProperty] === 'string') {
        return i[chosenProperty] === filter;
      } else {
        return i[chosenProperty].name === filter;
      }
    });
    setFilteredItems(newItemSet);
  }, [filter, chosenProperty, propertyArray]);

  const handlePropertyChoose = (property) => {
    if (chosenProperty === property) {
      setFilter(null);
      setPropertyArray([]);
      setFilteredItems(items);
    };
    setChosenProperty((prev) => prev === property ? null : property);
  };

  const handleFilter = (prop) => {
    if (filter === prop) {setFilteredItems(items)};
    setFilter((prev) => prev === prop ? null : prop);
  };

  // card selection --------------------------------------------------------------------------------
  const [selectionMode, setSelectionMode] = useState<'none' | 'delete' | 'select'>('none');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onLongPressItem = (id: string) => {
    setSelectionMode('select');
    setSelectedItems(prev => [...prev, id]);
    setIsSelectMode(true);
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  return (
    <View style={{ flex: 1 }}>
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} >
        <Surface style={styles.propertyButtonsContainer} elevation={0}>
          {Object.keys(ALL_ITEM_PROPERTIES).map((k, idx) => (
            <Button
              style={styles.propertyButton}
              mode={chosenProperty === k ? 'contained-tonal' : 'text'}
              key={idx}
              onPress={() => handlePropertyChoose(k)}
            >{ALL_ITEM_PROPERTIES[k]}</Button>
          ))}
        </Surface>
      </ScrollView>
      {propertyArray.length > 0 && (
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
            <Surface style={styles.propertyButtonsContainer} elevation={0}>
              {propertyArray.map((p, idx) => (
                <Button
                  style={styles.propertyButton}
                  mode={filter === p || filter === p.name? 'outlined' : 'text'}
                  compact={true}
                  key={idx}
                  onPress={() => handleFilter(p.name || p)}
                >{p.name || p}</Button>
              ))}
            </Surface>
          </ScrollView>
        </View>
      )}
    </View>
    <View style={{ flex: 1 }}>
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
                  onLongPress={onLongPressItem}
                  zoom={zoom}
                  selectionMode={selectionMode}
                  selected={selectedItems.includes(i.id)}
                  onSelectToggle={() => toggleItemSelection(i.id)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
    alignItems: 'center',
    gap: 2,
  },
  propertyButton: {
    padding: 0,
    margin: 0,
  }
});