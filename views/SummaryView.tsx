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
        title="Summary by Category"
        description="See which styles, fits, or colors you tend to keep or let go in each clothing category."
        onPress={() => navigation.navigate('SummaryDetail', {type: 'category'})}
      />
      <SummaryCard
        title="Summary by Feel"
        description="Understand how you feel in your clothes and what features are linked to comfort or confidence."
        onPress={() => navigation.navigate('SummaryDetail', {type: 'feel'})}
      />
      <SummaryCard
        title="Summary by Frequency"
        description="Discover what you actually wear — explore the traits of your most (and least) worn items."
        onPress={() => navigation.navigate('SummaryDetail', {type: 'frequency'})}
      />
      <SummaryCard
        title="Summary by Appearance"
        description="Find out what makes you feel beautiful and how your wardrobe reflects your self-image."
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