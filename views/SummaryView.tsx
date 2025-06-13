import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { useGroupedItems } from '../hooks/useGroupedItems';

import { View, SafeAreaView, StyleSheet } from 'react-native';
import SummaryCard from '../components/SummaryCard'
import SummarySectionList from '../components/SummarySectionList';

import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';


export default function HomeView() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <SummaryCard
        label="Summary by"
        keyword="Category"
        description="See which styles, fits, or colors you tend to keep or let go in each clothing category."
        icon='shape-outline'
        onPress={() => navigation.navigate('SummaryDetail', {type: 'category'})}
      />
      <SummaryCard
        label="Summary by"
        keyword="Feel"
        description="Understand how you feel in your clothes and what features are linked to feeling like yourself."
        icon='heart-outline'
        onPress={() => navigation.navigate('SummaryDetail', {type: 'feel'})}
      />
      <SummaryCard
        label="Summary by"
        keyword="Frequency"
        description="Discover what you actually wear — explore the traits of your most (and least) worn items."
        icon='calendar-check-outline'
        onPress={() => navigation.navigate('SummaryDetail', {type: 'frequency'})}
      />
      <SummaryCard
        label="Summary by"
        keyword="Appearance"
        description="Find out what makes you feel beautiful and how your wardrobe reflects your self-image."
        icon='mirror'
        onPress={() => navigation.navigate('SummaryDetail', {type: 'appearance'})}
      />
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
  },
});