import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import  { useWardrobeContext, useRegisterDelete }  from '../context/WardrobeContext';

import { Item } from '../database/models/Item';

import WardrobeVerticalList from '../components/WardrobeVerticalList';
import WardrobeHorizontalList from '../components/WardrobeHorizontalList';

export default function WardrobeView() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();

  const { numColumns, setNumColumns, viewType, isSelectMode, setIsSelectMode } = useWardrobeContext();
  const items = useQuery(Item);

  const zoom = (numColumns == 1) ? 1 : numColumns-1;


// card selection ==================================================================================
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const onLongPressItem = () => {
    setIsSelectMode(true);
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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
        <Text>No items found. Add your first piece!</Text>
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
      onLongPressItem={onLongPressItem}
      selectedItems={selectedItems}
      toggleItemSelection={toggleItemSelection}/>
    : <WardrobeHorizontalList
      items={items}
      navigation={navigation}
      onLongPressItem={onLongPressItem}
      selectedItems={selectedItems}
      toggleItemSelection={toggleItemSelection}/>
    }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
});