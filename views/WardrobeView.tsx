import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import  { useWardrobeContext }  from '../context/WardrobeContext';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import { Item } from '../database/models/Item';

import WardrobeVerticalList from '../components/WardrobeVerticalList';
import WardrobeHorizontalList from '../components/WardrobeHorizontalList';

type Props = NativeStackScreenProps<RootStackParamList, 'Wardrobe'>;

export default function WardrobeView({ navigation }: Props) {

  const { numColumns, setNumColumns, viewType } = useWardrobeContext();
  const items = useQuery(Item);

  const zoom = (numColumns == 1) ? 1 : numColumns-1;

  if (!items.length) {
    return (
      <View>
        <Text>No items found. Add your first piece!</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    {viewType === 'grid' ?
    <WardrobeVerticalList items={items} numColumns={numColumns} zoom={zoom} navigation={navigation}/>
    : <WardrobeHorizontalList items={items} navigation={navigation}/>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
});