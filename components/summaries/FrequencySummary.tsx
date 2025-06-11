import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useQuery } from '@realm/react';
import { Item } from '../../database/models/Item';
import SummarySectionList from '../SummarySectionList';
import { Surface } from 'react-native-paper';

import { LEVELS } from '../../constants/index';

export default function FrequencySummary() {
  const allItems = useQuery(Item);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {LEVELS['frequency'].map((level, index) => {
        const filteredItems = allItems.filtered('frequency == $0', level);

        return (
          <Surface key={index} style={styles.card} elevation={3}>
            <Text style={styles.heading}>{level}</Text>
            <SummarySectionList items={filteredItems} />
          </Surface>
        );
      })}
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.6;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: cardWidth,
    marginRight: 15,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
