import React, { useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import SummarySectionList from '../SummarySectionList';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../../database/models/Item';
import { Category } from '../../database/models/Category';

import { useWardrobeContext } from '../../context/WardrobeContext';

import { LEVELS, Titles } from '../../constants/index';

import {printQuestionSummaryForCategoryToJson} from '../../utility/printUtils';

export default function FeelSummary() {

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const allItems = useQuery(Item);

  const categories = useQuery(Category).map((cat) => cat.name);
  const [chosenCategory, setChosenCategory] = useState(null);

  const { categoryForPrint, setCategoryForPrint } = useWardrobeContext();

  const feelItemsArrays = useMemo(() => {
    if (!allItems || allItems.length === 0) return;

    return LEVELS['like_me'].map((level, index) => {
      if (chosenCategory) {
        return allItems.filtered('like_me == $0 AND category.name == $1', level, chosenCategory);
      } else {
        return allItems.filtered('like_me == $0', level);
      }
    });
  }, [allItems, chosenCategory]);

  const handleChooseCategory = (cat: string) => {
    setChosenCategory(cat);
    setCategoryForPrint(cat);
  };

  const handleAll = () => {
    setChosenCategory(null);
    setCategoryForPrint('All');
  };

  const jsonLog = printQuestionSummaryForCategoryToJson(allItems, 'like_me', categoryForPrint);
  console.log(jsonLog)

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

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

    <Text style={themedStyles.title} variant="titleLarge">{Titles.like_me}</Text>

    <View style={{ flex: 99 , flexDirection: 'row'}} key={chosenCategory+'_columns'}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {feelItemsArrays.map((filteredItems, index) => {
        return (
          <View key={index}>
          <Text style={themedStyles.heading} variant="titleMedium">{LEVELS.like_me[index]}</Text>
          <View style={themedStyles.card} elevation={0}>
            <SummarySectionList items={filteredItems} />
          </View>
          </View>
        );
      })}
    </ScrollView>
    </View>

    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.45;

const styles = (colors) => StyleSheet.create({
  categoryButtonsContainer: {
    flexDirection: 'row',
  },
  categoryTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    width: cardWidth,
    borderRightWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 8,
    backgroundColor: colors.primarySurface,
  },
  heading: {
    marginBottom: 10,
    textAlign: 'center',
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
  scrollContainer: {
    paddingHorizontal: 10,
  },
  title: {
    margin: 16,
    marginVertical: 16,
    color: colors.onSurfaceVariant,
  },
});
