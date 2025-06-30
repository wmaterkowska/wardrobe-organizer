import React, { useState } from 'react';
import { Image, View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import InsightCard from '../components/InsightCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import { useTabNavigation } from '../context/TabNavigationContext';

import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';
import { Item } from '../database/models/Item';
import { Strings } from '../constants';

import {
  getRandomCards,
  findMostWornColor,
  findRecentlyAddedItem,
  findItemYouForgotAbout,
  findFavouriteFit,
  findTheBestLikeMe,
  findFeelIn,
  findRecentOutfit } from '../utility/insightUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const realm = useRealm();
  const items = useQuery(Item);
  const mostWornColor = findMostWornColor({realm});
  const recentlyAddedItem = findRecentlyAddedItem({realm});
  const itemYouForgotAbout = findItemYouForgotAbout({realm});
  const favouriteFit = findFavouriteFit({realm});
  const theBestFeel = findTheBestLikeMe({realm});
  const feelInData = findFeelIn({realm});
  const recentOutfit = findRecentOutfit({realm});

  const insightCards = [
    <InsightCard type={'itemsInWardrobe'} data={items.length} key={0}/>,
    <InsightCard type={'mostWornColor'} data={mostWornColor} key={1}/>,
    <InsightCard type={'recentlyAdded'} data={recentlyAddedItem} key={2}/>,
    <InsightCard type={'declutterPrompt'} data={itemYouForgotAbout} key={3}/>,
    <InsightCard type={'favouriteFit'} data={favouriteFit} key={4}/>,
    <InsightCard type={'theBestFeel'} data={theBestFeel} key={5} />,
    <InsightCard type={'feelIn'} data={feelInData} key={6} />,
    <InsightCard type={'recentOutfit'} data={recentOutfit} key={7} />,
  ];

  const randomCards = getRandomCards(insightCards);

  return (
    <SafeAreaView style={styles.container} >
    <View style={styles.view}>

      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 32 }}>
        {Strings.appName}
      </Text>

      <View style={styles.cardContainer}>
          {randomCards.map((card) => card)}
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: '5%',
    marginTop: '5%',
    gap: '10%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
    alignSelf: 'center',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
  },
});