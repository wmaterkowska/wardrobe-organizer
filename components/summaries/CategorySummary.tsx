import React, { useState } from 'react';
import Realm from 'realm';
import { useQuery } from '@realm/react';

import { useWardrobeContext } from '../../context/WardrobeContext';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import SummarySectionList from '../SummarySectionList';

import { Item } from '../../database/models/Item';
import { Category } from '../../database/models/Category';

type Props = {
  itemsKeep: Item[];
  itemsLetGo: Item[];
}

export default function CategorySummary({itemsKeep, itemsLetGo}: Props) {

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const categories = useQuery(Category).map((cat) => cat.name);

  const { categoryForPrint, setCategoryForPrint } = useWardrobeContext();

  const [itemsKeepToShow, setItemsKeepToShow] = useState(itemsKeep);
  const [itemsLetGoToShow, setItemsLetGoToShow] = useState(itemsLetGo);
  const [chosenCategory, setChosenCategory] = useState(null);

  const handleChooseCategory = (cat: string) => {
    setChosenCategory(cat);
    setCategoryForPrint(cat);

    const filteredKeep = itemsKeep.filtered('category.name == $0', cat);
    const filteredLetGo = itemsLetGo.filtered('category.name == $0', cat);
    setItemsKeepToShow([...filteredKeep]);
    setItemsLetGoToShow([...filteredLetGo]);
  };

  const handleAll = () => {
    setChosenCategory(null);
    setCategoryForPrint('All');
    setItemsKeepToShow(itemsKeep);
    setItemsLetGoToShow(itemsLetGo);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
        <Surface style={themedStyles.categoryButtonsContainer} elevation={0}>
            <Button
              style={[themedStyles.propertyButton, chosenCategory === null ? themedStyles.propertyButtonSelected : null]}
              textColor={colors.onBackground}
              rippleColor='transparent'
              onPress={() => handleAll()}
            >All</Button>
          {categories.map((cat, idx) => (
            <Button
              style={[themedStyles.propertyButton, chosenCategory === cat ? themedStyles.propertyButtonSelected : null]}
              textColor={colors.onBackground}
              rippleColor='transparent'
              key={idx}
              onPress={() => handleChooseCategory(cat)}>{cat}</Button>
          ))}
        </Surface>
      </ScrollView>

      <View style={{ flex: 99 , flexDirection: 'row'}} key={chosenCategory+'_columns'}>
        <View style={themedStyles.column}>
          <Text style={themedStyles.columnTitle} variant="titleMedium">Let Go</Text>
          <SummarySectionList key={chosenCategory+'_letGo'} items={itemsLetGoToShow} />
        </View>

        <View style={themedStyles.divider} />

        <View style={themedStyles.column}>
          <Text style={themedStyles.columnTitle} variant="titleMedium">Keep</Text>
          <SummarySectionList key={chosenCategory+'_keep'} items={itemsKeepToShow} />
        </View>

      </View>
    </View>
  )
}

const styles = (colors) => StyleSheet.create({
  categoryButtonsContainer: {
    flexDirection: 'row',
  },
  categoryTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  columnTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: colors.outline,
    marginHorizontal: 4,
    marginTop: 30,
    marginBottom: 60,
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
  },
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
});