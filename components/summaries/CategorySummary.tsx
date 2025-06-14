import React, { useState } from 'react';
import Realm from 'realm';
import { useQuery } from '@realm/react';

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

  const [itemsKeepToShow, setItemsKeepToShow] = useState(itemsKeep);
  const [itemsLetGoToShow, setItemsLetGoToShow] = useState(itemsLetGo);
  const [chosenCategory, setChosenCategory] = useState(null);

  const [keepsFilteredByCategory, setKeepsFilterByCategory] = useState(itemsKeep);
  const [letGosFilteredByCategory, setLetGosFilteredByCategory] = useState(itemsLetGo);

  const handleChooseCategory = (cat: string) => {
    setChosenCategory(cat);

    const filteredKeep = itemsKeep.filtered('category.name == $0', cat);
    const filteredLetGo = itemsLetGo.filtered('category.name == $0', cat);
    setItemsKeepToShow([...filteredKeep]);
    setItemsLetGoToShow([...filteredLetGo]);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
        <Surface style={themedStyles.categoryButtonsContainer} elevation={0}>
          {categories.map((cat, idx) => (
            <Button key={idx} onPress={() => handleChooseCategory(cat)}>{cat}</Button>
          ))}
        </Surface>
      </ScrollView>

      <Text style={themedStyles.categoryTitle} variant="titleMedium">{chosenCategory}</Text>

      <View style={{ flex: 99 , flexDirection: 'row'}} key={chosenCategory+'_columns'}>
        <View style={themedStyles.column}>
          <Text style={themedStyles.columnTitle} variant="titleSmall">Keep</Text>
          <SummarySectionList key={chosenCategory+'_keep'} items={itemsKeepToShow} />
        </View>

        <View style={themedStyles.divider} />

        <View style={themedStyles.column}>
          <Text style={themedStyles.columnTitle} variant="titleSmall">Let Go</Text>
          <SummarySectionList key={chosenCategory+'_letGo'} items={itemsLetGoToShow} />
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
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  column: {
    flex: 1,
    paddingHorizontal: 8,
  },
  columnTitle: {
    fontWeight: 'bold',
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
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
});