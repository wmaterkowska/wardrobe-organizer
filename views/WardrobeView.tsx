import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

import { useQuery } from '@realm/react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import { Item } from '../database/models/Item'
import ItemCard from '../components/ItemCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Wardrobe'>;

export default function WardrobeView({ navigation }: Props) {

  const [numColumns, setNumColumns] = useState(2);
  const items = useQuery(Item);
  console.log('items', items);

  if (!items.length) {
    return (
      <View>
        <Text>No items found. Add your first piece!</Text>
      </View>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.wardrobeContainer}>
      {Array.from(Array(numColumns)).map((_, colIndex) => (
        <View style={styles.wardrobeColumn} key={colIndex}>
          {items.filter((item, idx) => idx % numColumns === colIndex).map((i) => (
              <ItemCard
                key={i.id}
                item={i}
                onPress={() =>
                  navigation.navigate('ItemDetail', {
                    itemId: i.id,
                  })
                }
                zoom={numColumns-1}
              />
          ))}
        </View>
      ))}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wardrobeContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: "row",
  },
  wardrobeColumn: {
    flex: 1,
  },
});