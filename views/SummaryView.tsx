import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import Realm from 'realm';
import { useQuery } from '@realm/react';
import { useGroupedItems } from '../hooks/useGroupedItems';

import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import SummarySectionList from '../components/SummarySectionList';

import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';

type Props = NativeStackScreenProps<RootStackParamList, 'Summary'>;

export default function HomeView({ navigation }: Props) {

  const itemsKeep = useQuery(Item).filtered('want == $0', 'Keep');
  const itemsLetGo = useQuery(Item).filtered('want == $0', 'Let go');
  const categories = useQuery(Category).map((cat) => cat.name);

  const [itemsKeepToShow, setItemsKeepToShow] = useState(itemsKeep);
  const [itemsLetGoToShow, setItemsLetGoToShow] = useState(itemsLetGo);
  const [chosenCategory, setChosenCategory] = useState(null);

  const [keepsFilteredByCategory, setKeepsFilterByCategory] = useState(itemsKeep);
  const [letGosFilteredByCategory, setLetGosFilteredByCategory] = useState(itemsLetGo);

  const handleChooseCategory = (cat: string) => {
    setChosenCategory(cat);

    const filteredKeep = itemsKeep.filtered('category.name == $0', cat);
    const filteredLetGo = itemsLetGo.filtered('category.name == $0', cat);
    setItemsKeepToShow([...filteredKeep]);
    setItemsLetGoToShow([...filteredLetGo]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
        <Surface style={styles.categoryButtonsContainer} elevation={0}>
          {categories.map((cat, idx) => (
            <Button key={idx} onPress={() => handleChooseCategory(cat)}>{cat}</Button>
          ))}
        </Surface>
      </ScrollView>
      <View style={{ flex: 99 , flexDirection: 'row'}} key={chosenCategory}>
        <SummarySectionList key={chosenCategory+'_keep'} items={itemsKeepToShow} />
        <SummarySectionList key={chosenCategory+'_letGo'} items={itemsLetGoToShow} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryButtonsContainer: {
    flexDirection: 'row',
  },
});