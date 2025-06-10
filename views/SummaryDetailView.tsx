import React from 'react';
import Realm from 'realm';
import { useQuery } from '@realm/react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { View, Text } from 'react-native';
import CategorySummary from '../components/summaries/CategorySummary';
import FeelSummary from '../components/summaries/FeelSummary';
import FrequencySummary from '../components/summaries/FrequencySummary';
import AppearanceSummary from '../components/summaries/AppearanceSummary';

import { Item } from './../database/models/Item';

type Props = NativeStackScreenProps<RootStackParamList, 'SummaryDetail'>;

export default function SummaryDetailView({ route }: Props) {
  const { type } = route.params;

  const itemsKeep = useQuery(Item).filtered('want == $0', 'Keep');
  const itemsLetGo = useQuery(Item).filtered('want == $0', 'Let go');

  if (!itemsKeep.length && !itemsLetGo) {
    return (
      <View>
        <Text>No items found. Add your first piece!</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      {type === 'category' && (
        <CategorySummary itemsKeep={itemsKeep} itemsLetGo={itemsLetGo} />
      )}
      {type === 'feel' && (
        <FeelSummary />
      )}
      {type === 'frequency' && (
        <FrequencySummary />
      )}
      {type === 'appearance' && (
        <AppearanceSummary />
      )}
    </View>
  );
}
