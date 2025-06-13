import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { useGroupedItems } from '../hooks/useGroupedItems';

import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Surface, Card, Text } from 'react-native-paper';
import SummarySectionList from '../components/SummarySectionList';

import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';


export default function HomeView() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ flex: 1 }}>
      <View style={{ gap: 12 }}>
        <Card>
        <Card.Content>
          <Text variant="titleMedium">Summary by Category</Text>
          <Text variant="bodySmall">Explore which types of clothes you own most.</Text>
          <Button onPress={() => navigation.navigate('SummaryDetail', {type: 'category'})}>View Summary</Button>
        </Card.Content>
        </Card>

        <Card>
        <Card.Content>
          <Text variant="titleMedium">How You Feel in Your Clothes</Text>
          <Text variant="bodySmall">See how your wardrobe supports your comfort and confidence.</Text>
          <Button onPress={() => navigation.navigate('SummaryDetail', {type: 'feel'})}>View Summary</Button>
        </Card.Content>
        </Card>

        <Card>
        <Card.Content>
          <Text variant="titleMedium">Frequency of Use</Text>
          <Text variant="bodySmall">Discover what you wear the most (and least).</Text>
          <Button onPress={() => navigation.navigate('SummaryDetail', {type: 'frequency'})}>View Summary</Button>
        </Card.Content>
        </Card>

        <Card>
        <Card.Content>
          <Text variant="titleMedium">How You See Yourself</Text>
          <Text variant="bodySmall">Review how your wardrobe reflects your style and image.</Text>
          <Button onPress={() => navigation.navigate('SummaryDetail', {type: 'appearance'})}>View Summary</Button>
        </Card.Content>
        </Card>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});