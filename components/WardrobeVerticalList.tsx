import React, { useCallback, useState, useEffect } from 'react';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';
import ItemCard from './ItemCard';
import PropertyChip from './PropertyChip';

import { isRealmList } from '../hooks/useGroupedItems';

import { Item } from '../database/models/Item';
import { NumColumns, useWardrobeContext } from '../context/WardrobeContext';
import { ALL_ITEM_PROPERTIES, propertyModelDictionary, LEVELS, WANT_ARRAY } from '../constants/index';

type Props = {
  items: Item[];
  numColumns: NumColumns;
  zoom: int;
  navigation;
  onLongPressItem?: () => void;
}

export default function WardrobeVerticalList({items, numColumns, zoom, navigation, onLongPressItem, selectedItems}: Props) {

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const { isSelectMode } = useWardrobeContext();

  const [filteredItems, setFilteredItems ] = useState<Item[]>(items);
  const [chosenProperty, setChosenProperty] = useState<string | null>('main_category');
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

  return (
    <View style={{ flex: 1 }}>
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} >
        <Surface style={themedStyles.propertyButtonsContainer} elevation={0}>
          {Object.keys(ALL_ITEM_PROPERTIES).map((k, idx) => (
            <Button
              style={[themedStyles.propertyButton, chosenProperty === k ? themedStyles.propertyButtonSelected : null]}
              textColor={colors.onBackground}
              rippleColor='transparent'
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
            <Surface style={themedStyles.propertyButtonsContainer} elevation={0}>
              {propertyArray.map((p, idx) => (
                <PropertyChip
                  label={p.name || p}
                  onPress={() => handleFilter(p.name || p)}
                  selected={filter === p || filter === p.name ? true : false}
                  color={p.color_code ? p.color_code : null}
                  colorSize={p.color_code ? 16 : null}
                  key={idx}
                />
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
        <View style={themedStyles.wardrobeContainer}>
          {Array.from(Array(numColumns)).map((_, colIndex) => (
            <View style={themedStyles.wardrobeColumn} key={colIndex}>
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

const styles = (colors) => StyleSheet.create({
  wardrobeContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: "row",
  },
  wardrobeColumn: {
    flex: 1,
  },
  propertyButtonsContainer: {
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyButton: {
    padding: 0,
    margin: 0,
    color: colors.onBackground,
  },
  propertyButtonSelected: {
    borderTopWidth: 2,
    borderColor: colors.onBackground,
    borderRadius: 0,
    color: colors.onBackground,
  }
});