import React from 'react';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import SummarySectionList from '../SummarySectionList';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../../database/models/Item';

import { LEVELS, Titles } from '../../constants/index';

export default function FrequencySummary() {
  const allItems = useQuery(Item);

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

    <Text style={themedStyles.title} variant="titleLarge">{Titles.frequency}</Text>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {LEVELS['frequency'].map((level, index) => {
        const filteredItems = allItems.filtered('frequency == $0', level);
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
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.45;

const styles = (colors) => StyleSheet.create({
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
