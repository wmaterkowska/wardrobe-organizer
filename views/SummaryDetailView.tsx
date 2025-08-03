import React from 'react';
import Realm from 'realm';
import { useQuery } from '@realm/react';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { View, Text } from 'react-native';
import CategorySummary from '../components/summaries/CategorySummary';
import QuestionSummary from '../components/summaries/QuestionSummary';

import { typeQuestionMap } from '../constants/categoryArrays';

import { Item } from './../database/models/Item';

type Props = NativeStackScreenProps<RootStackParamList, 'SummaryDetail'>;

export default function SummaryDetailView({ route }: Props) {
  const { type } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {type === 'category' ? (
        <CategorySummary />
      ) : (
        <QuestionSummary questionType={typeQuestionMap[type]} />
      )}
    </View>
  );
}
