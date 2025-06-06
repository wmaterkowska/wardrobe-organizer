import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import Realm from 'realm';
import { useQuery } from '@realm/react';
import { useGroupedItems } from '../hooks/useGroupedItems';

import { View } from 'react-native';
import { Button } from 'react-native-paper';
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

  const groupedItemsKeep = useGroupedItems(itemsKeep, 'category');
  const groupedItemsLetGo = useGroupedItems(itemsLetGo, 'category');

  const handleChooseCategory = (cat) => {
     setItemsKeepToShow(groupedItemsKeep(cat));
     setItemsLetGoToShow(groupedItemsLetGo(cat));
  };

  return (
    <View>
      {categories.map((cat, idx) => (
        <Button key={idx} onPress={() => handleChooseCategory(cat)}>{cat}</Button>
      ))}
      <SummarySectionList items={itemsKeep}/>
      <SummarySectionList items={itemsLetGo}/>
    </View>
  )
}