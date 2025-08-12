import React, { useCallback, useState, useEffect } from 'react';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { ScrollView, View, StyleSheet } from 'react-native';
import { Button, Surface, useTheme } from 'react-native-paper';
import ItemCard from './ItemCard';
import PropertyChip from './PropertyChip';

import { isRealmList } from '../hooks/useGroupedItems';

import { Item } from '../database/models/Item';
import { Color } from '../database/models/Color';
import { NumColumns, useWardrobeContext } from '../context/WardrobeContext';
import { ALL_ITEM_PROPERTIES, propertyModelDictionary, LEVELS, WANT_ARRAY } from '../constants/index';

import { useTranslation } from 'react-i18next';

type Props = {
  items: Item[];
  numColumns: NumColumns;
  zoom: int;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onLongPressItem?: () => void;
}

export default function WardrobeVerticalList({items, numColumns, zoom, navigation, onLongPressItem}: Props) {

  const { t } = useTranslation();

  const { colors } = useTheme();
  const themedStyles = styles(colors);
  const realm = useRealm();

  const { isSelectMode } = useWardrobeContext();

  const [filteredItems, setFilteredItems ] = useState<Item[]>(items);
  const [chosenProperty, setChosenProperty] = useState<string | null>('main_category');
  const [propertyArray, setPropertyArray] = useState([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [uniqueUsedProperties, setUniqueUsedProperties] = useState([]);

  const { main, category, color, pattern, fit, cut, textile, occasion, feels } = useAllPropertyManagers();
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
      if (!i[chosenProperty]) return;
      if (isRealmList(i[chosenProperty])) {
        return i[chosenProperty].map((p) => p.name).includes(filter);
      } else if (typeof i[chosenProperty] === 'string' || typeof i[chosenProperty] === 'number') {
        return i[chosenProperty] === filter || i[chosenProperty] === parseInt(filter);
      } else {
        return i[chosenProperty].name === filter;
      }
    });
    setFilteredItems(newItemSet);
  }, [filter, chosenProperty, propertyArray]);

  const handlePropertyChoose = (property) => {
    setChosenProperty(property);
  };

  const handleFilter = (prop) => {
    if (filter === prop) {setFilteredItems(items)};
    setFilter((prev) => prev === prop ? null : prop);
  };

  useEffect(() => {
    const usedProperties = items.flatMap((i) => {
      if (isRealmList(i[chosenProperty])) {
        return i[chosenProperty].map((p) => p.name) ?? [];
      } else if (i[chosenProperty] instanceof Realm.Object) {
        return i[chosenProperty].name;
      } else {
        return (LEVELS[chosenProperty]);
      }
    }).filter((v): v is string => v != undefined);

    if (chosenProperty === 'colors') {
      setUniqueUsedProperties(realm.objects(Color).filtered('name IN $0', usedProperties));
    } else {
      setUniqueUsedProperties(Array.from(new Set(usedProperties)));
    }
  }, [chosenProperty])

  if (!items.length) {
    return (
      <View>
        <Text>{t('common:noItemsFind')}</Text>
      </View>
    )
  }

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
            >{t(`properties:${ALL_ITEM_PROPERTIES[k].replaceAll(' ', '')}`)}</Button>
          ))}
        </Surface>
      </ScrollView>
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
            <Surface style={themedStyles.propertyButtonsContainer} elevation={0}>
              {uniqueUsedProperties.map((p, idx) => (
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