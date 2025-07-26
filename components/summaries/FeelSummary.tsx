import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Button, Text, Surface } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import SummarySectionList from '../SummarySectionList';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../../database/models/Item';
import { Category } from '../../database/models/Category';

import { LEVELS, Titles } from '../../constants/index';

export default function FeelSummary() {
  const allItems = useQuery(Item);

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const categories = useQuery(Category).map((cat) => cat.name);

  const [chosenCategory, setChosenCategory] = useState(null);

  const handleChooseCategory = (cat: string) => {
    setChosenCategory(cat);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, paddingBottom: 5 }} >
        <Surface style={themedStyles.categoryButtonsContainer} elevation={0}>
          {categories.map((cat, idx) => (
            <Button key={idx} onPress={() => handleChooseCategory(cat)}>{cat}</Button>
          ))}
        </Surface>
      </ScrollView>

      <Text style={themedStyles.categoryTitle} variant="titleLarge">{chosenCategory}</Text>


    <Text style={themedStyles.title} variant="titleLarge">{Titles.like_me}</Text>

    <View style={{ flex: 99 , flexDirection: 'row'}} key={chosenCategory+'_columns'}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {LEVELS['like_me'].map((level, index) => {
        const filteredItems = allItems.filtered('like_me == $0', level);
        return (
          <View key={index}>
          <Text style={themedStyles.heading} variant="titleMedium">{level}</Text>
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
  scrollContainer: {
    paddingHorizontal: 10,
  },
  title: {
    margin: 16,
    marginVertical: 16,
    textAlign: 'center',
    color: colors.onSurfaceVariant,
  },
});
