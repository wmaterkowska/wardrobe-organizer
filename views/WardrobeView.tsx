import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { useWardrobeContext, useRegisterDelete }  from '../context/WardrobeContext';

import { Item } from '../database/models/Item';

import WardrobeVerticalList from '../components/WardrobeVerticalList';
import WardrobeHorizontalList from '../components/WardrobeHorizontalList';

import { useTranslation } from 'react-i18next';

export default function WardrobeView() {

  const { t } = useTranslation();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();

  const { numColumns, setNumColumns, viewType, isSelectMode, setIsSelectMode, selectedItems, setSelectedItems } = useWardrobeContext();
  const items = useQuery(Item);

  const zoom = (numColumns == 1) ? 1 : numColumns-1;

// card selection ==================================================================================
  const onLongPressItem = () => {
    setIsSelectMode(true);
  };

  const deleteFn = useCallback(() => {
    realm.write(() => {
      selectedItems.forEach((id) => {
        const itemToDelete = realm.objectForPrimaryKey(Item, id);
        if (itemToDelete) realm.delete(itemToDelete);
      });
     });

    setSelectedItems([]);
  }, [selectedItems, realm]);

  useRegisterDelete(deleteFn);

  if (!items.length) {
    return (
      <View>
        <Text>{t('common:noItemsFind')}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    {viewType === 'grid' ?
    <WardrobeVerticalList
      items={items}
      numColumns={numColumns}
      zoom={zoom}
      navigation={navigation}
      onLongPressItem={onLongPressItem}/>
    : <WardrobeHorizontalList
      items={items}
      navigation={navigation}
      onLongPressItem={onLongPressItem}/>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
});